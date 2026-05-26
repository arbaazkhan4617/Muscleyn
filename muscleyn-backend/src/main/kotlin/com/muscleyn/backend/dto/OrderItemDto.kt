package com.muscleyn.backend.dto

import java.math.BigDecimal

data class OrderItemDto(

    val productId: Long?,

    val variantId: Long?,

    val productName:
        String?,

    val variantName:
        String?,

    val productImage:
        String?,

    val quantity:
        BigDecimal,

    val price:
        BigDecimal,

    val totalAmount:
        BigDecimal
)