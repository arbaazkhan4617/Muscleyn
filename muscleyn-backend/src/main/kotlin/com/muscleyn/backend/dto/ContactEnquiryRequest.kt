package com.muscleyn.backend.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class ContactEnquiryRequest(

    @field:NotBlank(
        message =
        "Full name is required"
    )
    @field:Size(
        max = 120,
        message =
        "Full name must be less than 120 characters"
    )
    val fullName: String?,

    @field:NotBlank(
        message =
        "Email is required"
    )
    @field:Email(
        message =
        "Email is invalid"
    )
    val email: String?,

    @field:Size(
        max = 20,
        message =
        "Phone must be less than 20 characters"
    )
    val phone: String?,

    @field:NotBlank(
        message =
        "Subject is required"
    )
    @field:Size(
        max = 180,
        message =
        "Subject must be less than 180 characters"
    )
    val subject: String?,

    @field:NotBlank(
        message =
        "Message is required"
    )
    @field:Size(
        max = 5000,
        message =
        "Message must be less than 5000 characters"
    )
    val message: String?,
)
