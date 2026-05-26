package com.muscleyn.backend.dto

import java.math.BigDecimal

data class PlaceOrderItemRequest(

    val productId: Long,

    val variantId: Long,

    val quantity:
        Int
)