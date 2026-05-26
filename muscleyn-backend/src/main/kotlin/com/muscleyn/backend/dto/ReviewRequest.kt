package com.muscleyn.backend.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class ReviewRequest(

    @field:NotNull(
        message =
            "User id is required"
    )
    val userId: Long?,

    @field:NotNull(
        message =
            "Product id is required"
    )
    val productId: Long?,

    @field:NotNull(
        message =
            "Rating is required"
    )
    @field:Min(
        value = 1,
        message =
            "Minimum rating is 1"
    )
    @field:Max(
        value = 5,
        message =
            "Maximum rating is 5"
    )
    val rating: Double?,

    val reviewText: String?,
)