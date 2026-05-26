package com.muscleyn.backend.dto

data class BannerRequest(

    val title: String?,

    val imageUrl: String?,

    val redirectUrl: String?,

    val sortOrder: Int?,

    val isActive: Boolean?,
)