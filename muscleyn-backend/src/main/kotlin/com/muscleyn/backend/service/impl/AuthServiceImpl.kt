package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.*
import com.muscleyn.backend.entity.User
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.security.JwtUtil
import com.muscleyn.backend.service.AuthService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl(

    private val userRepository:
    UserRepository,

    private val jwtUtil:
    JwtUtil

) : AuthService {

    private val passwordEncoder =
        BCryptPasswordEncoder()

    override fun register(
        request: RegisterRequest
    ): AuthResponse {

        if (
            userRepository.existsByMobileNumber(
                request.mobileNumber
            )
        ) {

            throw RuntimeException(
                "Mobile number already registered"
            )
        }

        val user = User(

            name = request.name,

            mobileNumber =
                request.mobileNumber,

            password =

                request.password
                    ?.let {

                        passwordEncoder.encode(
                            it
                        )
                    }
        )

        val savedUser =
            userRepository.save(user)

        val token =
            jwtUtil.generateToken(
                savedUser.mobileNumber!!
            )

        return AuthResponse(

            token = token,

            userId = savedUser.id,

            name = savedUser.name,

            mobileNumber =
                savedUser.mobileNumber
        )
    }

    override fun login(
        request: LoginRequest
    ): AuthResponse {

        val user =

            userRepository
                .findByMobileNumber(
                    request.mobileNumber
                )

                ?: throw RuntimeException(
                    "Invalid mobile number"
                )

        val passwordMatches =

            passwordEncoder.matches(

                request.password,

                user.password
            )

        if (!passwordMatches) {

            throw RuntimeException(
                "Invalid password"
            )
        }

        val token =
            jwtUtil.generateToken(
                user.mobileNumber!!
            )

        return AuthResponse(

            token = token,

            userId = user.id,

            name = user.name,

            mobileNumber =
                user.mobileNumber
        )
    }
}