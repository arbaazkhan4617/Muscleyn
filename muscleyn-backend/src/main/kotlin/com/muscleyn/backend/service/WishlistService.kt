package com.muscleyn.backend.service

import com.muscleyn.backend.dto.WishlistRequest
import com.muscleyn.backend.entity.Wishlist

interface WishlistService {

    fun addWishlist(
        request: WishlistRequest
    ): Wishlist

    fun getWishlist(
        userId: Long
    ): List<Wishlist>

    fun removeWishlist(
        wishlistId: Long
    )
}