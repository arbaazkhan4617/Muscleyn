package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.OrderItem
import com.muscleyn.backend.entity.Orders
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentStatus
import com.muscleyn.backend.repository.CartRepository
import com.muscleyn.backend.repository.OrderItemRepository
import com.muscleyn.backend.repository.OrdersRepository
import com.muscleyn.backend.repository.ProductVariantRepository
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
    ProductVariantRepository

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

        val order = Orders(
            userId = request.userId,
            addressId = request.addressId,
            totalAmount = totalAmount,
            paymentMethod = request.paymentMethod,
            paymentStatus = PaymentStatus.PENDING,
            orderStatus = OrderStatus.PLACED
        )

        val savedOrder = ordersRepository.save(order)

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

        return ordersRepository
            .save(order)
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
    }

}