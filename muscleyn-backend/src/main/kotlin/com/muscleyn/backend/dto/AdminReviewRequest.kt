package com.muscleyn.backend.dto

data class AdminReviewRequest(
    val productId: Long?,
    val userName: String?,
    val userEmail: String?,
    val rating: Double?,
    val reviewText: String?,
    val mediaUrls: String? = null,
    val isVerifiedBuyer: Boolean? = false,
    val appearInDashboard: Boolean? = false
)
