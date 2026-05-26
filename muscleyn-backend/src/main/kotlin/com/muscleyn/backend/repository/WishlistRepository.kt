package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Wishlist
import org.springframework.data.jpa.repository.JpaRepository

interface WishlistRepository :
    JpaRepository<Wishlist, Long> {

    fun findByUserId(
        userId: Long
    ): List<Wishlist>

    fun findByUserIdAndVariantId(

        userId: Long,

        variantId: Long

    ): Wishlist?
}