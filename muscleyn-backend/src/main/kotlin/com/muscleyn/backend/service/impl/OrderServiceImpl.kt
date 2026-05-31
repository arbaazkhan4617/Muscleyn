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
import com.muscleyn.backend.service.OrderService
import org.springframework.stereotype.Service
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
    CustomerOrderItemsRepository

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

        // DUAL-WRITE 1: Save CustomerOrders
        val customerOrder = CustomerOrders(
            userId = request.userId,
            addressId = request.addressId,
            totalAmount = totalAmount,
            deliveryCharge = BigDecimal.ZERO,
            discountAmount = BigDecimal.ZERO,
            finalAmount = totalAmount,
            paymentMethod = request.paymentMethod,
            paymentStatus = PaymentStatus.PENDING,
            orderStatus = OrderStatus.PENDING,
            paymentGateway = request.paymentGateway
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
            userId = request.userId,
            addressId = request.addressId,
            totalAmount = totalAmount,
            paymentMethod = request.paymentMethod,
            paymentStatus = PaymentStatus.PENDING,
            orderStatus = OrderStatus.PLACED,
            paymentGateway = gateway
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

        order.orderStatus =
            orderStatus

        val savedOrder = ordersRepository.save(order)

        // DUAL-UPDATE: Update CustomerOrders
        customerOrdersRepository.findById(orderId).ifPresent { customerOrder ->
            customerOrder.orderStatus = orderStatus
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