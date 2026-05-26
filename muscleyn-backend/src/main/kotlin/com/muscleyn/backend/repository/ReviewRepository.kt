package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ReviewRepository :
    JpaRepository<Review, Long> {

    fun findByProductIdOrderByIdDesc(
        productId: Long
    ): List<Review>

    fun findByUserIdAndProductId(

        userId: Long,

        productId: Long

    ): Review?

    @Query(
        """
        SELECT COALESCE(
            AVG(r.rating),
            0
        )
        FROM Review r
        WHERE r.productId =
        :productId
    """
    )
    fun getAverageRating(
        productId: Long
    ): Double
}