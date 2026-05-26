package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotNull

data class NotificationRequest(

    @field:NotNull(
        message =
            "User id is required"
    )
    val userId: Long?,

    val title: String?,

    val message: String?,
)