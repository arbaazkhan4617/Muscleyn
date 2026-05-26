package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.AddressRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Address
import com.muscleyn.backend.service.AddressService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/addresses")
class AddressController(

    private val addressService:
    AddressService

) {

    @PostMapping
    fun addAddress(

        @Valid
        @RequestBody
        request: AddressRequest

    ): ResponseDto<Address> {

        val address =
            addressService
                .addAddress(request)

        return ResponseDto(

            status = true,

            message =
                "Address added successfully",

            data = address
        )
    }

    @GetMapping("/{userId}")
    fun getUserAddresses(

        @PathVariable
        userId: Long

    ): ResponseDto<List<Address>> {

        val addresses =
            addressService
                .getUserAddresses(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Addresses fetched successfully",

            data = addresses
        )
    }

    @PutMapping("/{addressId}")
    fun updateAddress(

        @PathVariable
        addressId: Long,

        @Valid
        @RequestBody
        request: AddressRequest

    ): ResponseDto<Address> {

        val address =
            addressService
                .updateAddress(

                    addressId,

                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Address updated successfully",

            data = address
        )
    }

    @DeleteMapping("/{addressId}")
    fun deleteAddress(

        @PathVariable
        addressId: Long

    ): ResponseDto<Nothing> {

        addressService
            .deleteAddress(
                addressId
            )

        return ResponseDto(

            status = true,

            message =
                "Address deleted successfully",

            data = null
        )
    }
}