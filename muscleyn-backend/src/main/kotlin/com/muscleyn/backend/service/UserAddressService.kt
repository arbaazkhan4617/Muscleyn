package com.muscleyn.backend.service

import com.muscleyn.backend.dto.SaveAddressRequest
import com.muscleyn.backend.entity.UserAddress


interface UserAddressService {

    fun saveAddress(
        request: SaveAddressRequest
    ): UserAddress

    fun updateAddress(
        id: Long,
        request: SaveAddressRequest
    ): UserAddress

    fun getUserAddresses(
        userId: Long
    ): List<UserAddress>

    fun getDefaultAddress(
        userId: Long
    ): UserAddress?

    fun deleteAddress(
        id: Long,
        userId: Long
    )

    fun setDefaultAddress(
        id: Long,
        userId: Long
    )
}