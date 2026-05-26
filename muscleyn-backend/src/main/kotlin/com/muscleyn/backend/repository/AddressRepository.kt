package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Address
import org.springframework.data.jpa.repository.JpaRepository

interface AddressRepository :
    JpaRepository<Address, Long> {

    fun findByUserId(
        userId: Long
    ): List<Address>
}