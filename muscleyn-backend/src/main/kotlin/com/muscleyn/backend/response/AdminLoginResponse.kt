package com.muscleyn.backend.response

import com.muscleyn.backend.enums.UserRole

data class AdminLoginResponse(

    val token:
        String,

    val userId:
        Long,

    val name:
        String,

    val role:
        UserRole
)