package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.dto.WishlistRequest
import com.muscleyn.backend.entity.Wishlist
import com.muscleyn.backend.service.WishlistService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/wishlist")
class WishlistController(

    private val wishlistService:
    WishlistService

) {

    @PostMapping
    fun addWishlist(

        @Valid
        @RequestBody
        request: WishlistRequest

    ): ResponseDto<Wishlist> {

        val wishlist =
            wishlistService
                .addWishlist(request)

        return ResponseDto(

            status = true,

            message =
                "Wishlist added successfully",

            data = wishlist
        )
    }

    @GetMapping("/{userId}")
    fun getWishlist(

        @PathVariable
        userId: Long

    ): ResponseDto<List<Wishlist>> {

        val wishlist =
            wishlistService
                .getWishlist(userId)

        return ResponseDto(

            status = true,

            message =
                "Wishlist fetched successfully",

            data = wishlist
        )
    }

    @DeleteMapping("/{wishlistId}")
    fun removeWishlist(

        @PathVariable
        wishlistId: Long

    ): ResponseDto<Nothing> {

        wishlistService
            .removeWishlist(
                wishlistId
            )

        return ResponseDto(

            status = true,

            message =
                "Wishlist removed successfully",

            data = null
        )
    }
}