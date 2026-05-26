package com.muscleyn.backend.service

import com.muscleyn.backend.dto.*

interface AuthService {

    fun register(
        request: RegisterRequest
    ): AuthResponse

    fun login(
        request: LoginRequest
    ): AuthResponse
}