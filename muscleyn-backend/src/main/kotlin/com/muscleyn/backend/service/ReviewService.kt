package com.muscleyn.backend.service

import com.muscleyn.backend.dto.ReviewRequest
import com.muscleyn.backend.response.ReviewResponse

interface ReviewService {

    fun addReview(
        request: ReviewRequest
    ): ReviewResponse

    fun getProductReviews(
        productId: Long
    ): List<ReviewResponse>

    fun getAverageRating(
        productId: Long
    ): Double

    fun getAllReviews(): List<ReviewResponse>

    fun deleteReview(id: Long)

    fun getDashboardReviews(): List<ReviewResponse>

    fun addAdminReview(request: com.muscleyn.backend.dto.AdminReviewRequest): ReviewResponse

    fun updateAdminReview(reviewId: Long, request: com.muscleyn.backend.dto.AdminReviewRequest): ReviewResponse
}