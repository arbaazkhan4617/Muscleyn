package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotNull

data class WishlistRequest(

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
)