package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository :
    JpaRepository<User, Long> {

    fun findByMobileNumber(
        mobileNumber: String
    ): User?

    fun existsByMobileNumber(
        mobileNumber: String
    ): Boolean

    fun findByEmailOrMobileNumber(

        email: String,

        mobileNumber: String

    ): User?
}