package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.AdminLoginRequest

import com.muscleyn.backend.entity.User
import com.muscleyn.backend.enums.UserRole
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.response.AdminLoginResponse
import com.muscleyn.backend.security.JwtUtil
import com.muscleyn.backend.service.AdminAuthService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AdminAuthServiceImpl(

    private val userRepository:
    UserRepository,

    private val passwordEncoder:
    PasswordEncoder,

    private val jwtUtil:
    JwtUtil

) : AdminAuthService {

    override fun login(

        request:
        AdminLoginRequest

    ): AdminLoginResponse {

        // FIND USER
        val user: User =

            userRepository
                .findByEmailOrMobileNumber(

                    request.emailOrMobile,

                    request.emailOrMobile
                )

                ?: throw RuntimeException(
                    "Invalid credentials"
                )

        // ADMIN CHECK
        if (
            user.role !=
            UserRole.ROLE_ADMIN
        ) {

            throw RuntimeException(
                "Access denied"
            )
        }
        // PASSWORD CHECK
        val isPasswordValid =

            passwordEncoder.matches(

                request.password,

                user.password
            )

        if (!isPasswordValid) {

            throw RuntimeException(
                "Invalid Password"
            )
        }

        // GENERATE TOKEN
        val token =

            jwtUtil.generateToken(
                user.mobileNumber!!
            )

        return AdminLoginResponse(

            token = token,

            userId =
                user.id!!,

            name =
                user.name
                    ?: "",

            role =
                user.role!!

        )
    }
}