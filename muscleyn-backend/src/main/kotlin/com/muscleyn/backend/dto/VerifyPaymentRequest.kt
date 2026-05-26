package com.muscleyn.backend.dto



import com.muscleyn.backend.enums.PaymentGateway

data class VerifyPaymentRequest(

    val orderId: Long,

    val paymentGateway:
    PaymentGateway,

    val razorpayOrderId:
    String? = null,

    val razorpayPaymentId:
    String? = null,

    val razorpaySignature:
    String? = null
)