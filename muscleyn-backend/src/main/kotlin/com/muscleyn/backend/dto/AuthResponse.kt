package com.muscleyn.backend.dto

data class AuthResponse(

    val token: String,

    val userId: Long?,

    val name: String?,

    val mobileNumber: String?,
)