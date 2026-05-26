package com.muscleyn.backend.service

import com.muscleyn.backend.dto.ReviewRequest
import com.muscleyn.backend.entity.Review

interface ReviewService {

    fun addReview(
        request: ReviewRequest
    ): Review

    fun getProductReviews(
        productId: Long
    ): List<Review>

    fun getAverageRating(
        productId: Long
    ): Double
}