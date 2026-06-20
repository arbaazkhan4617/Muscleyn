package com.muscleyn.backend.response

import java.time.LocalDateTime

data class ReviewResponse(
    val id: Long?,
    val userId: Long?,
    val userName: String?,
    val userEmail: String?,
    val productId: Long?,
    val productName: String?,
    val rating: Double?,
    val reviewText: String?,
    val createdAt: LocalDateTime?,
    val mediaUrls: String?,
    val isVerifiedBuyer: Boolean?,
    val appearInDashboard: Boolean?,
)
