package com.muscleyn.backend.dto

import java.math.BigDecimal

data class PaymentConfigDto(
    val id: Long? = null,
    val paymentType: String,
    val codUpfrontValue: BigDecimal,
    val onlineUpfrontValue: BigDecimal,
    val isActive: Boolean
)
