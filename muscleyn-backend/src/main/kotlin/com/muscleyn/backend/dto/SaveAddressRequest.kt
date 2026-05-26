package com.muscleyn.backend.dto

import com.muscleyn.backend.enums.AddressType

data class SaveAddressRequest(

    val userId: Long,

    val fullName: String,

    val mobileNumber: String,

    val addressLine1: String,

    val addressLine2: String? = null,

    val landmark: String? = null,

    val city: String,

    val state: String,

    val country: String,

    val pincode: String,

    val addressType:
    AddressType,

    val isDefault: Boolean = false
)