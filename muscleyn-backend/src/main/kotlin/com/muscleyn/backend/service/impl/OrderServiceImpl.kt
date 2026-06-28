package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.OrderItem
import com.muscleyn.backend.entity.Orders
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.entity.CustomerOrders
import com.muscleyn.backend.entity.CustomerOrderItems
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentStatus
import com.muscleyn.backend.repository.CartRepository
import com.muscleyn.backend.repository.OrderItemRepository
import com.muscleyn.backend.repository.OrdersRepository
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.repository.CustomerOrdersRepository
import com.muscleyn.backend.repository.CustomerOrderItemsRepository
import com.muscleyn.backend.repository.PaymentConfigRepository
import com.muscleyn.backend.service.OrderService
import org.springframework.stereotype.Service
import java.math.RoundingMode
import java.math.BigDecimal

@Service
class OrderServiceImpl(

    private val cartRepository:
    CartRepository,

    private val ordersRepository:
    OrdersRepository,

    private val orderItemRepository:
    OrderItemRepository,

    private val productVariantRepository:
    ProductVariantRepository,

    private val customerOrdersRepository:
    CustomerOrdersRepository,

    private val customerOrderItemsRepository:
    CustomerOrderItemsRepository,

    private val paymentConfigRepository:
    PaymentConfigRepository

) : OrderService {

    override fun placeOrder(
        request: PlaceOrderRequest
    ): Orders {

        if (
            request.items.isEmpty()
        ) {
            throw RuntimeException(
                "Cart is empty"
            )
        }

        var totalAmount = BigDecimal.ZERO
        val variantsToUpdate = mutableListOf<ProductVariant>()

        request.items.forEach { itemReq ->
            val variant = productVariantRepository.findById(itemReq.variantId.toLong())
                .orElseThrow { RuntimeException("Variant not found: ${itemReq.variantId}") }

            val stock = variant.stock ?: 0
            val quantity = itemReq.quantity

            if (stock < quantity) {
                throw RuntimeException("${variant.variantName} stock not available")
            }

            val itemPrice = variant.price ?: BigDecimal.ZERO
            totalAmount = totalAmount.add(itemPrice.multiply(BigDecimal(quantity)))

            variant.stock = stock - quantity
            variantsToUpdate.add(variant)
        }

        // PAYMENT CONFIG CALCULATION
        var upfrontAmount = totalAmount
        var pendingAmount = BigDecimal.ZERO

        val configs = paymentConfigRepository.findAll()
        if (configs.isNotEmpty() && configs[0].isActive) {
            val config = configs[0]
            val value = if (request.paymentMethod == com.muscleyn.backend.enums.PaymentMethod.COD) config.codUpfrontValue else config.onlineUpfrontValue
            if (config.paymentType == "PERCENTAGE") {
                upfrontAmount = totalAmount.multiply(value).divide(BigDecimal(100), 4, RoundingMode.HALF_UP)
            } else if (config.paymentType == "FLAT") {
                upfrontAmount = if (value < totalAmount) value else totalAmount
            }
            pendingAmount = totalAmount.subtract(upfrontAmount)
        }
        
        val generatedOrderNumber = "ORD-" + java.util.UUID.randomUUID().toString().substring(0, 8).uppercase()

        // DUAL-WRITE 1: Save CustomerOrders
        val customerOrder = CustomerOrders(
            userId = request.userId,
            addressId = request.addressId,
            orderNumber = generatedOrderNumber,
            totalAmount = totalAmount,
            deliveryCharge = BigDecimal.ZERO,
            discountAmount = BigDecimal.ZERO,
            finalAmount = totalAmount,
            paymentMethod = request.paymentMethod,
            paymentStatus = PaymentStatus.PENDING,
            orderStatus = OrderStatus.PENDING,
            paymentGateway = request.paymentGateway,
            upfrontAmount = upfrontAmount,
            pendingAmount = pendingAmount
        )

        val savedCustomerOrder = customerOrdersRepository.save(customerOrder)

        // DUAL-WRITE 2: Save CustomerOrderItems
        val customerOrderItems = mutableListOf<CustomerOrderItems>()
        request.items.forEachIndexed { index, itemReq ->
            val variant = variantsToUpdate[index]
            val itemTotal = (variant.price ?: BigDecimal.ZERO).multiply(BigDecimal(itemReq.quantity))
            val customerOrderItem = CustomerOrderItems(
                orderId = savedCustomerOrder.id,
                productId = variant.product?.id,
                variantId = variant.id,
                productName = variant.product?.name,
                variantName = variant.variantName,
                price = variant.price ?: BigDecimal.ZERO,
                quantity = itemReq.quantity.toBigDecimal(),
                totalAmount = itemTotal,
                productImage = variant.product?.imageUrl
            )
            customerOrderItems.add(customerOrderItem)
        }
        customerOrderItemsRepository.saveAll(customerOrderItems)

        // DUAL-WRITE 3: Save Orders (with manually assigned ID matching CustomerOrders)
        val gateway = try {
            if (request.paymentGateway != null) com.muscleyn.backend.enums.PaymentGateway.valueOf(request.paymentGateway) else null
        } catch (e: Exception) {
            null
        }

        val order = Orders(
            id = savedCustomerOrder.id,
            orderNumber = generatedOrderNumber,
            userId = request.userId,
            addressId = request.addressId,
            totalAmount = totalAmount,
            paymentMethod = request.paymentMethod,
            paymentStatus = PaymentStatus.PENDING,
            orderStatus = OrderStatus.PLACED,
            paymentGateway = gateway,
            upfrontAmount = upfrontAmount,
            pendingAmount = pendingAmount
        )

        val savedOrder = ordersRepository.save(order)

        // DUAL-WRITE 4: Save OrderItem
        val orderItems = mutableListOf<OrderItem>()

        request.items.forEachIndexed { index, itemReq ->
            val variant = variantsToUpdate[index]
            val orderItem = OrderItem(
                order = savedOrder,
                variant = variant,
                quantity = itemReq.quantity,
                price = variant.price
            )
            orderItems.add(orderItem)
        }

        orderItemRepository.saveAll(orderItems)
        productVariantRepository.saveAll(variantsToUpdate)

        return savedOrder
    }

    override fun getUserOrders(
        userId: Long
    ): List<Orders> {

        return ordersRepository
            .findByUserIdOrderByIdDesc(
                userId
            )
    }

    override fun getOrderItems(
        orderId: Long
    ): List<OrderItem> {

        return orderItemRepository
            .findByOrderId(orderId)
    }

    override fun updateOrderStatus(

        orderId: Long,

        orderStatus: OrderStatus

    ): Orders {

        val order =

            ordersRepository
                .findById(orderId)

                .orElseThrow {

                    RuntimeException(
                        "Order not found"
                    )
                }

        // cancel pe stock return
        if (

            orderStatus ==
            OrderStatus.CANCELLED

            &&

            order.orderStatus !=
            OrderStatus.CANCELLED

        ) {

            val orderItems =

                orderItemRepository
                    .findByOrderId(orderId)

            orderItems.forEach {

                val variant =
                    it.variant

                variant?.stock =

                    variant?.stock
                        ?.plus(
                            it.quantity ?: 0
                        )
            }
        }

        order.orderStatus = orderStatus

        if (orderStatus == OrderStatus.DELIVERED) {
            order.paymentStatus = PaymentStatus.PAID
            order.upfrontAmount = order.totalAmount ?: java.math.BigDecimal.ZERO
            order.pendingAmount = java.math.BigDecimal.ZERO
        } else if (orderStatus == OrderStatus.CANCELLED) {
            order.paymentStatus = PaymentStatus.REFUNDED
        }

        val savedOrder = ordersRepository.save(order)

        // DUAL-UPDATE: Update CustomerOrders
        customerOrdersRepository.findById(orderId).ifPresent { customerOrder ->
            customerOrder.orderStatus = orderStatus
            if (orderStatus == OrderStatus.DELIVERED) {
                customerOrder.paymentStatus = PaymentStatus.PAID
                customerOrder.upfrontAmount = customerOrder.totalAmount ?: java.math.BigDecimal.ZERO
                customerOrder.pendingAmount = java.math.BigDecimal.ZERO
            } else if (orderStatus == OrderStatus.CANCELLED) {
                customerOrder.paymentStatus = PaymentStatus.REFUNDED
            }
            customerOrdersRepository.save(customerOrder)
        }

        return savedOrder
    }

    override fun updatePaymentStatus(
        orderId: Long,
        paymentStatus: PaymentStatus
    ): Orders {
        val order = ordersRepository.findById(orderId).orElseThrow {
            RuntimeException("Order not found")
        }

        order.paymentStatus = paymentStatus
        val savedOrder = ordersRepository.save(order)

        customerOrdersRepository.findById(orderId).ifPresent { customerOrder ->
            customerOrder.paymentStatus = paymentStatus
            if (paymentStatus == PaymentStatus.SUCCESS || paymentStatus == PaymentStatus.PAID) {
                customerOrder.upfrontAmount = customerOrder.totalAmount
                customerOrder.pendingAmount = BigDecimal.ZERO
            }
            customerOrdersRepository.save(customerOrder)
        }

        return savedOrder
    }

    override fun getAllOrders(): List<Orders> {
        return ordersRepository.findAll().sortedByDescending { it.id }
    }

    override fun deleteOrder(orderId: Long) {
        val order = ordersRepository.findById(orderId).orElseThrow {
            RuntimeException("Order not found")
        }
        val orderItems = orderItemRepository.findByOrderId(orderId)
        orderItemRepository.deleteAll(orderItems)
        ordersRepository.delete(order)

        // DUAL-DELETE: Delete CustomerOrders and CustomerOrderItems
        customerOrdersRepository.findById(orderId).ifPresent { customerOrder ->
            val customerOrderItems = customerOrderItemsRepository.findByOrderId(orderId)
            customerOrderItemsRepository.deleteAll(customerOrderItems)
            customerOrdersRepository.delete(customerOrder)
        }
    }

}