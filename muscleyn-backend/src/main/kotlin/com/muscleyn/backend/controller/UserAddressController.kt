package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.SaveAddressRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.UserAddress
import com.muscleyn.backend.service.UserAddressService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/address")
class UserAddressController(

    private val userAddressService:
        UserAddressService

) {

    // SAVE ADDRESS
    @PostMapping
    fun saveAddress(

        @RequestBody
        request: SaveAddressRequest

    ): ResponseDto<UserAddress> {

        val response =

            userAddressService
                .saveAddress(
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Address saved successfully",

            data = response
        )
    }

    // UPDATE ADDRESS
    @PutMapping("/{id}")
    fun updateAddress(

        @PathVariable
        id: Long,

        @RequestBody
        request: SaveAddressRequest

    ): ResponseDto<UserAddress> {

        val response =

            userAddressService
                .updateAddress(
                    id,
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Address updated successfully",

            data = response
        )
    }

    // GET USER ADDRESSES
    @GetMapping("/user/{userId}")
    fun getUserAddresses(

        @PathVariable
        userId: Long

    ): ResponseDto<List<UserAddress>> {

        val response =

            userAddressService
                .getUserAddresses(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Addresses fetched successfully",

            data = response
        )
    }

    // GET DEFAULT ADDRESS
    @GetMapping("/default/{userId}")
    fun getDefaultAddress(

        @PathVariable
        userId: Long

    ): ResponseDto<UserAddress?> {

        val response =

            userAddressService
                .getDefaultAddress(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Default address fetched successfully",

            data = response
        )
    }

    // DELETE ADDRESS
    @DeleteMapping("/{id}")
    fun deleteAddress(

        @PathVariable
        id: Long,

        @RequestParam
        userId: Long

    ): ResponseDto<String> {

        userAddressService
            .deleteAddress(
                id,
                userId
            )

        return ResponseDto(

            status = true,

            message =
                "Address deleted successfully",

            data = "SUCCESS"
        )
    }

    // SET DEFAULT ADDRESS
    @PutMapping("/default/{id}")
    fun setDefaultAddress(

        @PathVariable
        id: Long,

        @RequestParam
        userId: Long

    ): ResponseDto<String> {

        userAddressService
            .setDefaultAddress(
                id,
                userId
            )

        return ResponseDto(

            status = true,

            message =
                "Default address updated successfully",

            data = "SUCCESS"
        )
    }
}