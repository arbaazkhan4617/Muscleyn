package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.ReviewRequest
import com.muscleyn.backend.entity.Review
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.UserRole
import com.muscleyn.backend.repository.OrderItemRepository
import com.muscleyn.backend.repository.OrdersRepository
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.repository.ReviewRepository
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.response.ReviewResponse
import com.muscleyn.backend.service.ReviewService
import org.springframework.stereotype.Service

@Service
class ReviewServiceImpl(
    private val reviewRepository: ReviewRepository,
    private val userRepository: UserRepository,
    private val ordersRepository: OrdersRepository,
    private val orderItemRepository: OrderItemRepository,
    private val productRepository: ProductRepository
) : ReviewService {

    override fun addReview(
        request: ReviewRequest
    ): ReviewResponse {
        val user = userRepository.findById(request.userId!!)
            .orElseThrow { RuntimeException("User not found") }

        var isVerified = false
        if (user.role == UserRole.ROLE_ADMIN) {
            isVerified = true
        } else {
            val orders = ordersRepository.findByUserIdOrderByIdDesc(request.userId)
            isVerified = orders.filter { it.orderStatus != OrderStatus.CANCELLED }.any { order ->
                val items = orderItemRepository.findByOrderId(order.id!!)
                items.any { item -> item.variant?.product?.id == request.productId }
            }
        }

        if (!isVerified) {
            throw RuntimeException("You can only review products you have purchased.")
        }

        val existingReview =
            reviewRepository
                .findByUserIdAndProductId(
                    request.userId,
                    request.productId!!
                )

        if (
            existingReview != null
        ) {
            existingReview.rating = request.rating
            existingReview.reviewText = request.reviewText
            existingReview.mediaUrls = request.mediaUrls
            existingReview.isVerifiedBuyer = isVerified

            return reviewRepository
                .save(existingReview).toResponse()
        }

        val review = Review(
            userId = request.userId,
            productId = request.productId,
            rating = request.rating,
            reviewText = request.reviewText,
            mediaUrls = request.mediaUrls,
            isVerifiedBuyer = isVerified
        )

        return reviewRepository
            .save(review).toResponse()
    }

    override fun getProductReviews(
        productId: Long
    ): List<ReviewResponse> {
        return reviewRepository
            .findByProductIdOrderByIdDesc(
                productId
            )
            .map { it.toResponse() }
    }

    override fun getAverageRating(
        productId: Long
    ): Double {
        return reviewRepository
            .getAverageRating(
                productId
            )
    }

    override fun getAllReviews(): List<ReviewResponse> {
        return reviewRepository.findAll()
            .sortedByDescending { it.id }
            .map { it.toResponse() }
    }

    override fun deleteReview(id: Long) {
        reviewRepository.deleteById(id)
    }

    private fun Review.toResponse(): ReviewResponse {
        val user = userId?.let { userRepository.findById(it).orElse(null) }
        val product = productId?.let { productRepository.findById(it).orElse(null) }
        return ReviewResponse(
            id = id,
            userId = userId,
            userName = userName ?: user?.name,
            userEmail = userEmail ?: user?.email,
            productId = productId,
            productName = product?.name,
            rating = rating,
            reviewText = reviewText,
            createdAt = createdAt,
            mediaUrls = mediaUrls,
            isVerifiedBuyer = isVerifiedBuyer,
            appearInDashboard = appearInDashboard
        )
    }

    override fun getDashboardReviews(): List<ReviewResponse> {
        return reviewRepository.findByAppearInDashboardTrueOrderByIdDesc()
            .map { it.toResponse() }
    }

    override fun addAdminReview(request: com.muscleyn.backend.dto.AdminReviewRequest): ReviewResponse {
        val review = Review(
            productId = request.productId,
            userName = request.userName,
            userEmail = request.userEmail,
            rating = request.rating,
            reviewText = request.reviewText,
            mediaUrls = request.mediaUrls,
            isVerifiedBuyer = request.isVerifiedBuyer ?: false,
            appearInDashboard = request.appearInDashboard ?: false
        )
        return reviewRepository.save(review).toResponse()
    }

    override fun updateAdminReview(reviewId: Long, request: com.muscleyn.backend.dto.AdminReviewRequest): ReviewResponse {
        val review = reviewRepository.findById(reviewId)
            .orElseThrow { RuntimeException("Review not found") }
        review.productId = request.productId
        review.userName = request.userName
        review.userEmail = request.userEmail
        review.rating = request.rating
        review.reviewText = request.reviewText
        review.mediaUrls = request.mediaUrls
        review.isVerifiedBuyer = request.isVerifiedBuyer ?: false
        review.appearInDashboard = request.appearInDashboard ?: false
        return reviewRepository.save(review).toResponse()
    }
}