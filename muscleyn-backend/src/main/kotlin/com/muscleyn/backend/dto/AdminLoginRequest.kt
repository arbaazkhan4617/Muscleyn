package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotBlank

data class AdminLoginRequest(

    @field:NotBlank(
        message =
            "Email or mobile is required"
    )
    val emailOrMobile:
        String,

    @field:NotBlank(
        message =
            "Password is required"
    )
    val password:
        String
)