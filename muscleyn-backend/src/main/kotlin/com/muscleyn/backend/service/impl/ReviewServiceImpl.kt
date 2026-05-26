package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.ReviewRequest
import com.muscleyn.backend.entity.Review
import com.muscleyn.backend.repository.ReviewRepository
import com.muscleyn.backend.service.ReviewService
import org.springframework.stereotype.Service

@Service
class ReviewServiceImpl(

    private val reviewRepository:
    ReviewRepository

) : ReviewService {

    override fun addReview(
        request: ReviewRequest
    ): Review {

        val existingReview =

            reviewRepository
                .findByUserIdAndProductId(

                    request.userId!!,

                    request.productId!!
                )

        if (
            existingReview != null
        ) {

            existingReview.rating =
                request.rating

            existingReview.reviewText =
                request.reviewText

            return reviewRepository
                .save(existingReview)
        }

        val review = Review(

            userId =
                request.userId,

            productId =
                request.productId,

            rating =
                request.rating,

            reviewText =
                request.reviewText
        )

        return reviewRepository
            .save(review)
    }

    override fun getProductReviews(
        productId: Long
    ): List<Review> {

        return reviewRepository
            .findByProductIdOrderByIdDesc(
                productId
            )
    }

    override fun getAverageRating(
        productId: Long
    ): Double {

        return reviewRepository
            .getAverageRating(
                productId
            )
    }
}