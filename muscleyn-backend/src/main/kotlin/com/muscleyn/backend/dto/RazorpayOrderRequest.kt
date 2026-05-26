package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class RazorpayOrderRequest(

    @field:NotNull(
        message =
            "Amount is required"
    )
    val amount: BigDecimal?,

    val currency: String? = "INR",
)