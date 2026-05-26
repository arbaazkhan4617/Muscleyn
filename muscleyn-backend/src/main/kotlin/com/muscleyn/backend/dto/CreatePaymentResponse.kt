package com.muscleyn.backend.dto

data class CreatePaymentResponse(

    val orderId: Long?,

    val gatewayOrderId:
    String?,

    val paymentGateway:
    String?,

    val amount: String?,
)