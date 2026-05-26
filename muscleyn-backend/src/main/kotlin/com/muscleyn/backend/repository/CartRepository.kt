package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Cart
import org.springframework.data.jpa.repository.JpaRepository

interface CartRepository :
    JpaRepository<Cart, Long> {

    fun findByUserId(
        userId: Long
    ): List<Cart>

    fun findByUserIdAndVariantId(
        userId: Long,

        variantId: Long
    ): Cart?
}