package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.AdminLoginRequest
import com.muscleyn.backend.response.AdminLoginResponse
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.AdminAuthService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/auth")
class AdminAuthController(

    private val adminAuthService:
    AdminAuthService

) {

    @PostMapping("/login")
    fun login(

        @Valid
        @RequestBody
        request:
        AdminLoginRequest

    ): ResponseDto<AdminLoginResponse> {

        val response =

            adminAuthService
                .login(request)

        return ResponseDto(

            status = true,

            message =
                "Admin login successful",

            data = response
        )
    }
}