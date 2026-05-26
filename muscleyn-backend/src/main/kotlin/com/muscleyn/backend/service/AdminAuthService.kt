package com.muscleyn.backend.service

import com.muscleyn.backend.dto.AdminLoginRequest
import com.muscleyn.backend.response.AdminLoginResponse

interface AdminAuthService {

    fun login(
        request:
        AdminLoginRequest
    ): AdminLoginResponse
}