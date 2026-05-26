package com.muscleyn.backend.dto

import com.muscleyn.backend.enums.PaymentGateway
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class CreatePaymentRequest(

    @field:NotNull(
        message =
            "Order id is required"
    )
    val orderId: Long?,

    val amount:
    BigDecimal,

    @field:NotNull(
        message =
            "Payment gateway is required"
    )


    val paymentGateway:
    PaymentGateway?,
)