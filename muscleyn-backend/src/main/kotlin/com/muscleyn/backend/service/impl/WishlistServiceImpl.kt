package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.WishlistRequest
import com.muscleyn.backend.entity.Wishlist
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.repository.WishlistRepository
import com.muscleyn.backend.service.WishlistService
import org.springframework.stereotype.Service

@Service
class WishlistServiceImpl(

    private val wishlistRepository:
    WishlistRepository,

    private val productVariantRepository:
    ProductVariantRepository

) : WishlistService {

    override fun addWishlist(
        request: WishlistRequest
    ): Wishlist {

        val existingWishlist =

            wishlistRepository
                .findByUserIdAndVariantId(

                    request.userId!!,

                    request.variantId!!
                )

        if (
            existingWishlist != null
        ) {

            return existingWishlist
        }

        val variant =

            productVariantRepository
                .findById(
                    request.variantId
                )

                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        val wishlist = Wishlist(

            userId =
                request.userId,

            variant =
                variant
        )

        return wishlistRepository
            .save(wishlist)
    }

    override fun getWishlist(
        userId: Long
    ): List<Wishlist> {

        return wishlistRepository
            .findByUserId(userId)
    }

    override fun removeWishlist(
        wishlistId: Long
    ) {

        val wishlist =

            wishlistRepository
                .findById(wishlistId)

                .orElseThrow {

                    RuntimeException(
                        "Wishlist item not found"
                    )
                }

        wishlistRepository
            .delete(wishlist)
    }
}