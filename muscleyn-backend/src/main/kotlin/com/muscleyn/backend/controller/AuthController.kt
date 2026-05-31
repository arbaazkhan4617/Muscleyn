package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.*
import com.muscleyn.backend.service.AuthService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(

    private val authService:
    AuthService

) {

    @PostMapping("/register")
    fun register(

        @Valid
        @RequestBody
        request: RegisterRequest

    ): ResponseDto<AuthResponse> {

        val response =
            authService
                .register(request)

        return ResponseDto(

            status = true,

            message =
                "User registered successfully",

            data = response
        )
    }

    @PostMapping("/login")
    fun login(

        @Valid
        @RequestBody
        request: LoginRequest

    ): ResponseDto<AuthResponse> {

        val response =
            authService
                .login(request)

        return ResponseDto(

            status = true,

            message =
                "Login successful",

            data = response
        )
    }

    @PostMapping("/google")
    fun googleLogin(

        @RequestBody
        request: GoogleAuthRequest

    ): ResponseDto<AuthResponse> {

        val response =
            authService
                .googleLogin(request)

        return ResponseDto(

            status = true,

            message =
                "Google login successful",

            data = response
        )
    }
}