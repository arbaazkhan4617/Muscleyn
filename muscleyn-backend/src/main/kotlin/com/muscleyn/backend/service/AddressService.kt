package com.muscleyn.backend.service

import com.muscleyn.backend.dto.AddressRequest
import com.muscleyn.backend.entity.Address

interface AddressService {

    fun addAddress(
        request: AddressRequest
    ): Address

    fun getUserAddresses(
        userId: Long
    ): List<Address>

    fun updateAddress(

        addressId: Long,

        request: AddressRequest

    ): Address

    fun deleteAddress(
        addressId: Long
    )
}