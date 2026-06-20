package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.dto.ReviewRequest
import com.muscleyn.backend.response.ReviewResponse
import com.muscleyn.backend.service.ReviewService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reviews")
class ReviewController(

    private val reviewService:
    ReviewService

) {

    @PostMapping
    fun addReview(

        @Valid
        @RequestBody
        request: ReviewRequest

    ): ResponseDto<ReviewResponse> {

        val review =
            reviewService
                .addReview(request)

        return ResponseDto(

            status = true,

            message =
                "Review added successfully",

            data = review
        )
    }

    @GetMapping("/{productId}")
    fun getProductReviews(

        @PathVariable
        productId: Long

    ): ResponseDto<List<ReviewResponse>> {

        val reviews =
            reviewService
                .getProductReviews(
                    productId
                )

        return ResponseDto(

            status = true,

            message =
                "Reviews fetched successfully",

            data = reviews
        )
    }

    @GetMapping(
        "/average/{productId}"
    )
    fun getAverageRating(

        @PathVariable
        productId: Long

    ): ResponseDto<Double> {

        val average =
            reviewService
                .getAverageRating(
                    productId
                )

        return ResponseDto(

            status = true,

            message =
                "Average rating fetched successfully",

            data = average
        )
    }

    @GetMapping("/dashboard")
    fun getDashboardReviews(): ResponseDto<List<ReviewResponse>> {
        val reviews = reviewService.getDashboardReviews()
        return ResponseDto(
            status = true,
            message = "Dashboard reviews fetched successfully",
            data = reviews
        )
    }
}