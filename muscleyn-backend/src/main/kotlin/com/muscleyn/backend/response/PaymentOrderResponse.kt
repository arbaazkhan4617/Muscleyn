package com.muscleyn.backend.response

import com.muscleyn.backend.enums.PaymentGateway

data class PaymentOrderResponse(

    val paymentGateway:
        PaymentGateway?,

    val orderId:
        String,

    val amount: Long,

    val currency: String,

    val key: String? = null,

    val redirectUrl:
        String? = null
)