package com.muscleyn.backend.dto

data class BannerRequest(

    val title: String?,

    val eyebrow: String?,

    val subtitle: String?,

    val imageUrl: String?,

    val boxImageUrl: String?,

    val redirectUrl: String?,

    val sortOrder: Int?,

    val isActive: Boolean?,
)