package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotBlank

data class RegisterRequest(

    @field:NotBlank(
        message =
            "Name is required"
    )
    val name: String,

    @field:NotBlank(
        message =
            "Mobile number is required"
    )
    val mobileNumber: String,

    val password: String?,
)