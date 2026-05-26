package com.muscleyn.backend.service.impl


import com.muscleyn.backend.dto.SaveAddressRequest
import com.muscleyn.backend.entity.UserAddress
import com.muscleyn.backend.repository.UserAddressRepository
import com.muscleyn.backend.service.UserAddressService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserAddressServiceImpl(

    private val userAddressRepository:
    UserAddressRepository

) : UserAddressService {

    @Transactional
    override fun saveAddress(
        request: SaveAddressRequest
    ): UserAddress {

        // REMOVE OLD DEFAULT
        if (request.isDefault) {

            val defaultAddress =

                userAddressRepository
                    .findByUserIdAndIsDefaultTrue(
                        request.userId
                    )

            defaultAddress.ifPresent {

                it.isDefault = false

                userAddressRepository.save(it)
            }
        }

        val address = UserAddress(

            userId =
                request.userId,

            fullName =
                request.fullName,

            mobileNumber =
                request.mobileNumber,

            addressLine1 =
                request.addressLine1,

            addressLine2 =
                request.addressLine2,

            landmark =
                request.landmark,

            city =
                request.city,

            state =
                request.state,

            country =
                request.country,

            pincode =
                request.pincode,

            addressType =
                request.addressType,

            isDefault =
                request.isDefault
        )

        return userAddressRepository
            .save(address)
    }

    @Transactional
    override fun updateAddress(

        id: Long,

        request: SaveAddressRequest

    ): UserAddress {

        val address =

            userAddressRepository
                .findById(id)
                .orElseThrow {

                    RuntimeException(
                        "Address not found"
                    )
                }

        // REMOVE OLD DEFAULT
        if (request.isDefault) {

            val defaultAddress =

                userAddressRepository
                    .findByUserIdAndIsDefaultTrue(
                        request.userId
                    )

            defaultAddress.ifPresent {

                if (it.id != id) {

                    it.isDefault = false

                    userAddressRepository.save(it)
                }
            }
        }

        address.fullName =
            request.fullName

        address.mobileNumber =
            request.mobileNumber

        address.addressLine1 =
            request.addressLine1

        address.addressLine2 =
            request.addressLine2

        address.landmark =
            request.landmark

        address.city =
            request.city

        address.state =
            request.state

        address.country =
            request.country

        address.pincode =
            request.pincode

        address.addressType =
            request.addressType

        address.isDefault =
            request.isDefault

        return userAddressRepository
            .save(address)
    }

    override fun getUserAddresses(
        userId: Long
    ): List<UserAddress> {

        return userAddressRepository
            .findByUserIdAndIsActiveTrue(
                userId
            )
    }

    override fun getDefaultAddress(
        userId: Long
    ): UserAddress? {

        return userAddressRepository
            .findByUserIdAndIsDefaultTrue(
                userId
            )
            .orElse(null)
    }

    @Transactional
    override fun deleteAddress(

        id: Long,

        userId: Long

    ) {

        val address =

            userAddressRepository
                .findByIdAndUserId(
                    id,
                    userId
                )
                .orElseThrow {

                    RuntimeException(
                        "Address not found"
                    )
                }

        address.isActive = false

        userAddressRepository
            .save(address)
    }

    @Transactional
    override fun setDefaultAddress(

        id: Long,

        userId: Long

    ) {

        // REMOVE OLD DEFAULT
        val oldDefault =

            userAddressRepository
                .findByUserIdAndIsDefaultTrue(
                    userId
                )

        oldDefault.ifPresent {

            it.isDefault = false

            userAddressRepository.save(it)
        }

        // NEW DEFAULT
        val address =

            userAddressRepository
                .findByIdAndUserId(
                    id,
                    userId
                )
                .orElseThrow {

                    RuntimeException(
                        "Address not found"
                    )
                }

        address.isDefault = true

        userAddressRepository
            .save(address)
    }
}