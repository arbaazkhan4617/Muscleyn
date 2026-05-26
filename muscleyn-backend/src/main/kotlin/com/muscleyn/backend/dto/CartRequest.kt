package com.muscleyn.backend.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class CartRequest(

    @field:NotNull(
        message =
            "User id is required"
    )
    val userId: Long?,

    @field:NotNull(
        message =
            "Variant id is required"
    )
    val variantId: Long?,

    @field:NotNull(
        message =
            "Quantity is required"
    )
    @field:Min(
        value = 1,
        message =
            "Quantity must be at least 1"
    )
    val quantity: Int?,
)