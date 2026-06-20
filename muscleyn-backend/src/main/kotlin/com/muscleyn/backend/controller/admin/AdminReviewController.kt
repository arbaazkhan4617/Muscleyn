package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.response.ReviewResponse
import com.muscleyn.backend.service.ReviewService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/reviews")
class AdminReviewController(
    private val reviewService: ReviewService
) {

    @GetMapping
    fun getAllReviews(): ResponseDto<List<ReviewResponse>> {
        val reviews = reviewService.getAllReviews()
        return ResponseDto(
            status = true,
            message = "All reviews fetched successfully",
            data = reviews
        )
    }

    @DeleteMapping("/{id}")
    fun deleteReview(@PathVariable id: Long): ResponseDto<Unit> {
        reviewService.deleteReview(id)
        return ResponseDto(
            status = true,
            message = "Review deleted successfully",
            data = null
        )
    }

    @PostMapping
    fun addAdminReview(
        @RequestBody request: com.muscleyn.backend.dto.AdminReviewRequest
    ): ResponseDto<ReviewResponse> {
        val review = reviewService.addAdminReview(request)
        return ResponseDto(
            status = true,
            message = "Review added successfully by admin",
            data = review
        )
    }

    @PutMapping("/{id}")
    fun updateAdminReview(
        @PathVariable id: Long,
        @RequestBody request: com.muscleyn.backend.dto.AdminReviewRequest
    ): ResponseDto<ReviewResponse> {
        val review = reviewService.updateAdminReview(id, request)
        return ResponseDto(
            status = true,
            message = "Review updated successfully by admin",
            data = review
        )
    }
}
