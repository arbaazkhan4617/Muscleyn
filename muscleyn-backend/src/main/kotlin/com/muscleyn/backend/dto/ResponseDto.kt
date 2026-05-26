package com.muscleyn.backend.dto

data class ResponseDto<T>(

    val status: Boolean,

    val message: String,

    val data: T? = null,
)