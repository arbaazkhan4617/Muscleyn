package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.UserAddress
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserAddressRepository :
    JpaRepository<UserAddress, Long> {

    fun findByUserIdAndIsActiveTrue(
        userId: Long
    ): List<UserAddress>

    fun findByIdAndUserId(
        id: Long,
        userId: Long
    ): Optional<UserAddress>

    fun findByUserIdAndIsDefaultTrue(
        userId: Long
    ): Optional<UserAddress>
}