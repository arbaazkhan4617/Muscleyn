package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotBlank

data class LoginRequest(

    @field:NotBlank(
        message =
            "Mobile number is required"
    )
    val mobileNumber: String,

    @field:NotBlank(
        message =
            "Password is required"
    )
    val password: String,
)