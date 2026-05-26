package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.CustomerOrderItems
import com.muscleyn.backend.entity.CustomerOrders
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentStatus
import com.muscleyn.backend.repository.CustomerOrderItemsRepository
import com.muscleyn.backend.repository.CustomerOrdersRepository
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.service.PlaceOrderService
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class PlaceOrderServiceImpl(

    private val customerOrdersRepository:
        CustomerOrdersRepository,

    private val customerOrderItemsRepository:
        CustomerOrderItemsRepository,

    private val productVariantRepository:
        ProductVariantRepository

) : PlaceOrderService {

    @Transactional
    override fun placeOrder(

        request: PlaceOrderRequest

    ): CustomerOrders {

        var totalAmount =
            BigDecimal.ZERO

        val variants =
            mutableListOf<ProductVariant>()

        // VALIDATE PRODUCTS
        request.items.forEach {

            val variant =

                productVariantRepository
                    .findById(
                        it.variantId
                    )
                    .orElseThrow {

                        RuntimeException(
                            "Variant not found"
                        )
                    }

            // STOCK CHECK
            if (

                variant?.stock!!
                    < it.quantity

            ) {

                throw RuntimeException(
                    "Insufficient stock"
                )
            }

            val itemTotal =

                variant.price?.multiply(
                    it.quantity.toBigDecimal()
                )

            totalAmount =
                totalAmount.add(
                    itemTotal
                )

            variants.add(
                variant
            )
        }

        // CREATE ORDER
        val order = CustomerOrders(

            userId =
                request.userId,

            addressId =
                request.addressId,

            totalAmount =
                totalAmount,

            deliveryCharge =
                BigDecimal.ZERO,

            discountAmount =
                BigDecimal.ZERO,

            finalAmount =
                totalAmount,

            paymentMethod =
                request.paymentMethod,

            paymentStatus =
                PaymentStatus.PENDING,

            orderStatus =
                OrderStatus.PENDING,

            paymentGateway =
                request.paymentGateway
        )

        val savedOrder =

            customerOrdersRepository
                .save(order)

        // SAVE ITEMS
        request.items.forEachIndexed {

            index,

            item ->

            val variant =
                variants[index]

            val itemTotal =

                variant.price?.multiply(
                    item.quantity.toBigDecimal()
                )

            val orderItem =
                CustomerOrderItems(

                    orderId =
                        savedOrder.id,

                    productId =
                        variant.product?.id,

                    variantId =
                        variant.id,

                    productName =
                        variant.product?.name,

                    variantName =
                        variant.variantName,

                    price =
                        variant.price!!,

                    quantity =
                        item.quantity.toBigDecimal(),

                    totalAmount =
                        itemTotal!!,

                    productImage =
                        variant.product?.imageUrl
                )

            customerOrderItemsRepository
                .save(orderItem)

            // REDUCE STOCK
            variant.stock =

                variant.stock!! -
                    item.quantity


            productVariantRepository
                .save(variant)
        }

        return savedOrder
    }
}