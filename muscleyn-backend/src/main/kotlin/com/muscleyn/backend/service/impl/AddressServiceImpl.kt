package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.AddressRequest
import com.muscleyn.backend.entity.Address
import com.muscleyn.backend.repository.AddressRepository
import com.muscleyn.backend.service.AddressService
import org.springframework.stereotype.Service

@Service
class AddressServiceImpl(

    private val addressRepository:
    AddressRepository

) : AddressService {

    override fun addAddress(
        request: AddressRequest
    ): Address {

        if (
            request.isDefault == true
        ) {

            val oldAddresses =

                addressRepository
                    .findByUserId(
                        request.userId!!
                    )

            oldAddresses.forEach {

                it.isDefault = false
            }

            addressRepository
                .saveAll(oldAddresses)
        }

        val address = Address(

            userId = request.userId,

            fullName =
                request.fullName,

            mobileNumber =
                request.mobileNumber,

            pincode =
                request.pincode,

            state = request.state,

            city = request.city,

            houseNo =
                request.houseNo,

            area = request.area,

            landmark =
                request.landmark,

            addressType =
                request.addressType,

            isDefault =
                request.isDefault
        )

        return addressRepository
            .save(address)
    }

    override fun getUserAddresses(
        userId: Long
    ): List<Address> {

        return addressRepository
            .findByUserId(userId)
    }

    override fun updateAddress(

        addressId: Long,

        request: AddressRequest

    ): Address {

        val address =

            addressRepository
                .findById(addressId)

                .orElseThrow {

                    RuntimeException(
                        "Address not found"
                    )
                }

        if (
            request.isDefault == true
        ) {

            val oldAddresses =

                addressRepository
                    .findByUserId(
                        request.userId!!
                    )

            oldAddresses.forEach {

                it.isDefault = false
            }

            addressRepository
                .saveAll(oldAddresses)
        }

        address.fullName =
            request.fullName

        address.mobileNumber =
            request.mobileNumber

        address.pincode =
            request.pincode

        address.state =
            request.state

        address.city =
            request.city

        address.houseNo =
            request.houseNo

        address.area =
            request.area

        address.landmark =
            request.landmark

        address.addressType =
            request.addressType!!

        address.isDefault =
            request.isDefault

        return addressRepository
            .save(address)
    }

    override fun deleteAddress(
        addressId: Long
    ) {

        val address =

            addressRepository
                .findById(addressId)

                .orElseThrow {

                    RuntimeException(
                        "Address not found"
                    )
                }

        addressRepository
            .delete(address)
    }
}