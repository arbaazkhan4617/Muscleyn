package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CreatePaymentRequest
import com.muscleyn.backend.dto.VerifyPaymentRequest
import com.muscleyn.backend.entity.CustomerOrders
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentGateway
import com.muscleyn.backend.enums.PaymentMethod
import com.muscleyn.backend.enums.PaymentStatus
import com.muscleyn.backend.repository.CustomerOrdersRepository
import com.muscleyn.backend.repository.OrdersRepository
import com.muscleyn.backend.response.PaymentOrderResponse
import com.muscleyn.backend.service.PaymentService
import com.razorpay.Order
import com.razorpay.RazorpayClient
import com.razorpay.Utils
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class PaymentServiceImpl(

    private val razorpayClient:
    RazorpayClient,

    private val customerOrdersRepository:
    CustomerOrdersRepository,

    private val ordersRepository:
    OrdersRepository,

    @Value("\${razorpay.key.id}")
    private val razorpayKey: String,

    @Value("\${razorpay.key.secret}")
    private val razorpayKeySecret:
    String

) : PaymentService {

    override fun createPayment(

        request:
        CreatePaymentRequest

    ): PaymentOrderResponse {

        val order =

            customerOrdersRepository
                .findById(
                    request.orderId!!
                )
                .orElseThrow {

                    RuntimeException(
                        "Order not found"
                    )
                }

        // COD FLOW
        if (
            order.paymentMethod ==
            PaymentMethod.COD
        ) {

            return PaymentOrderResponse(

                paymentGateway = null,

                orderId =
                    order.id.toString(),

                amount =
                    order.finalAmount
                        .multiply(
                            BigDecimal(100)
                        )
                        .toLong(),

                currency = "INR",

                key = null,

                redirectUrl = null
            )
        }

        // ONLINE FLOW
        return when (
            request.paymentGateway
        ) {

            PaymentGateway.RAZORPAY -> {

                createRazorpayOrder(
                    order,
                    request.amount
                )
            }

            PaymentGateway.PHONEPE -> {

                createPhonePeOrder(
                    order,
                    request.amount
                )
            }

            else -> {

                throw RuntimeException(
                    "Invalid payment gateway"
                )
            }
        }
    }

    // RAZORPAY
    private fun createRazorpayOrder(

        order: CustomerOrders,

        amount: BigDecimal

    ): PaymentOrderResponse {

        val options =
            JSONObject()

        options.put(

            "amount",

            amount.multiply(
                BigDecimal(100)
            ).toLong()
        )

        options.put(
            "currency",
            "INR"
        )

        options.put(
            "receipt",
            order.id.toString()
        )

        val razorpayOrder:
                Order =

            razorpayClient
                .orders
                .create(options)

        return PaymentOrderResponse(

            paymentGateway =
                PaymentGateway.RAZORPAY,

            orderId =
                razorpayOrder.get(
                    "id"
                )as String,

            amount =
                (razorpayOrder.get(
                            "amount"
                        ) as Number
                        ).toLong(),

            currency =
                razorpayOrder.get(
                    "currency"
                )as String,

            key =
                razorpayKey,

            redirectUrl = null
        )
    }

    // PHONEPE
    private fun createPhonePeOrder(

        order: CustomerOrders,

        amount: BigDecimal

    ): PaymentOrderResponse {

        // FUTURE:
        // PHONEPE API INTEGRATION

        return PaymentOrderResponse(

            paymentGateway =
                PaymentGateway.PHONEPE,

            orderId =
                order.id.toString(),

            amount =
                amount.multiply(
                    BigDecimal(100)
                ).toLong(),

            currency =
                "INR",

            key = null,

            redirectUrl =
                "PHONEPE_URL"
        )
    }

    override fun verifyPayment(

        request:
        VerifyPaymentRequest

    ): String {

        val order =

            customerOrdersRepository
                .findById(
                    request.orderId
                )
                .orElseThrow {

                    RuntimeException(
                        "Order not found"
                    )
                }

        // COD
        if (
            order.paymentMethod ==
            PaymentMethod.COD
        ) {

            order.paymentStatus =
                PaymentStatus.PENDING

            order.orderStatus =
                OrderStatus.CONFIRMED

            customerOrdersRepository
                .save(order)

            syncOrderStatusToDb(order)

            return "COD_CONFIRMED"
        }

        // RAZORPAY
        // RAZORPAY
        if (
            request.paymentGateway ==
            PaymentGateway.RAZORPAY
        ) {

            val attributes =
                JSONObject()

            attributes.put(
                "razorpay_order_id",
                request.razorpayOrderId
            )

            attributes.put(
                "razorpay_payment_id",
                request.razorpayPaymentId
            )

            attributes.put(
                "razorpay_signature",
                request.razorpaySignature
            )

            val isValid =

                Utils.verifyPaymentSignature(

                    attributes,

                    razorpayKeySecret
                )

            // INVALID SIGNATURE
            if (!isValid) {

                order.paymentStatus =
                    PaymentStatus.FAILED

                customerOrdersRepository
                    .save(order)

                syncOrderStatusToDb(order)

                throw RuntimeException(
                    "Invalid payment signature"
                )
            }

            // SUCCESS
            order.paymentStatus =
                PaymentStatus.SUCCESS

            order.orderStatus =
                OrderStatus.CONFIRMED

            order.transactionId =
                request.razorpayPaymentId

            customerOrdersRepository
                .save(order)

            syncOrderStatusToDb(order)

            return "PAYMENT_SUCCESS"
        }

        // PHONEPE
        if (
            request.paymentGateway ==
            PaymentGateway.PHONEPE
        ) {

            // FUTURE:
            // PHONEPE VERIFY API

            order.paymentStatus =
                PaymentStatus.SUCCESS

            order.orderStatus =
                OrderStatus.CONFIRMED

            customerOrdersRepository
                .save(order)

            syncOrderStatusToDb(order)

            return "PAYMENT_SUCCESS"
        }

        throw RuntimeException(
            "Invalid payment gateway"
        )
    }

    private fun syncOrderStatusToDb(order: CustomerOrders) {
        ordersRepository.findById(order.id!!).ifPresent { dbOrder ->
            dbOrder.paymentStatus = order.paymentStatus
            dbOrder.orderStatus = order.orderStatus
            dbOrder.updatedAt = java.time.LocalDateTime.now()
            ordersRepository.save(dbOrder)
        }
    }
}