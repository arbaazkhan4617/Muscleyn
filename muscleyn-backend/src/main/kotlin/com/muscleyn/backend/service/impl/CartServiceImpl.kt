package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CartRequest
import com.muscleyn.backend.entity.Cart
import com.muscleyn.backend.repository.CartRepository
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.service.CartService
import org.springframework.stereotype.Service

@Service
class CartServiceImpl(

    private val cartRepository:
    CartRepository,

    private val productVariantRepository:
    ProductVariantRepository

) : CartService {

    override fun addToCart(
        request: CartRequest
    ): Cart {

        val variant =

            productVariantRepository
                .findById(
                    request.variantId!!
                )

                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        val existingCart =

            cartRepository
                .findByUserIdAndVariantId(

                    request.userId!!,

                    request.variantId
                )

        if (
            existingCart != null
        ) {

            existingCart.quantity =

                existingCart.quantity
                    ?.plus(
                        request.quantity!!
                    )

            return cartRepository
                .save(existingCart)
        }

        val cart = Cart(

            userId =
                request.userId,

            quantity =
                request.quantity,

            variant =
                variant
        )

        return cartRepository
            .save(cart)
    }

    override fun getCartItems(
        userId: Long
    ): List<Cart> {

        return cartRepository
            .findByUserId(userId)
    }

    override fun updateQuantity(

        cartId: Long,

        quantity: Int

    ): Cart {

        val cart =

            cartRepository
                .findById(cartId)

                .orElseThrow {

                    RuntimeException(
                        "Cart item not found"
                    )
                }

        cart.quantity = quantity

        return cartRepository
            .save(cart)
    }

    override fun removeCartItem(
        cartId: Long
    ) {

        val cart =

            cartRepository
                .findById(cartId)

                .orElseThrow {

                    RuntimeException(
                        "Cart item not found"
                    )
                }

        cartRepository.delete(cart)
    }
}