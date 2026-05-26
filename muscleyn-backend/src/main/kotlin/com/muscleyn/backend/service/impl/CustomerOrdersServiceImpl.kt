package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.OrderDetailsDto
import com.muscleyn.backend.dto.OrderItemDto
import com.muscleyn.backend.dto.OrderSummaryDto
import com.muscleyn.backend.repository.CustomerOrderItemsRepository
import com.muscleyn.backend.repository.CustomerOrdersRepository
import com.muscleyn.backend.service.CustomerOrdersService
import org.springframework.stereotype.Service

@Service
class CustomerOrdersServiceImpl(

    private val customerOrdersRepository:
    CustomerOrdersRepository,
    private val customerOrderItemsRepository: CustomerOrderItemsRepository

) : CustomerOrdersService {

    override fun getMyOrders(
        userId: Long
    ): List<OrderSummaryDto> {

        val orders =

            customerOrdersRepository
                .findByUserIdOrderByIdDesc(
                    userId
                )

        return orders.map {

            OrderSummaryDto(

                id = it.id,

                finalAmount =
                    it.finalAmount,

                paymentMethod =
                    it.paymentMethod,

                paymentStatus =
                    it.paymentStatus,

                orderStatus =
                    it.orderStatus,

                createdAt =
                    it.createdAt
            )
        }
    }

    override fun getOrderDetails(

        orderId: Long

    ): OrderDetailsDto {

        val order =

            customerOrdersRepository
                .findById(orderId)
                .orElseThrow {

                    RuntimeException(
                        "Order not found"
                    )
                }

        val orderItems =

            customerOrderItemsRepository
                .findByOrderId(
                    orderId
                )

        return OrderDetailsDto(

            id = order.id,

            finalAmount =
                order.finalAmount,

            deliveryCharge =
                order.deliveryCharge,

            discountAmount =
                order.discountAmount,

            paymentMethod =
                order.paymentMethod,

            paymentStatus =
                order.paymentStatus,

            orderStatus =
                order.orderStatus,

            createdAt =
                order.createdAt,

            items =

                orderItems.map {

                    OrderItemDto(

                        productId =
                            it.productId,

                        variantId =
                            it.variantId,

                        productName =
                            it.productName,

                        variantName =
                            it.variantName,

                        productImage =
                            it.productImage,

                        quantity =
                            it.quantity,

                        price =
                            it.price,

                        totalAmount =
                            it.totalAmount
                    )
                }
        )
    }


}