package com.muscleyn.backend.dto

import com.muscleyn.backend.enums.AddressType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class AddressRequest(

    @field:NotNull(
        message =
            "User id is required"
    )
    val userId: Long?,

    @field:NotBlank(
        message =
            "Full name is required"
    )
    val fullName: String,

    @field:NotBlank(
        message =
            "Mobile number is required"
    )
    val mobileNumber: String,

    @field:NotBlank(
        message =
            "Pincode is required"
    )
    val pincode: String,

    @field:NotBlank(
        message =
            "State is required"
    )
    val state: String,

    @field:NotBlank(
        message =
            "City is required"
    )
    val city: String,

    @field:NotBlank(
        message =
            "House number is required"
    )
    val houseNo: String,

    @field:NotBlank(
        message =
            "Area is required"
    )
    val area: String,

    val landmark: String?,

    val addressType: AddressType?,

    val isDefault: Boolean?,
)