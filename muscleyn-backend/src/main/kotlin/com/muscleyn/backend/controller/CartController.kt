package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CartRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Cart
import com.muscleyn.backend.service.CartService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cart")
class CartController(

    private val cartService:
    CartService

) {

    @PostMapping
    fun addToCart(

        @Valid
        @RequestBody
        request: CartRequest

    ): ResponseDto<Cart> {

        val cart =
            cartService
                .addToCart(request)

        return ResponseDto(

            status = true,

            message =
                "Added to cart successfully",

            data = cart
        )
    }

    @GetMapping("/{userId}")
    fun getCartItems(

        @PathVariable
        userId: Long

    ): ResponseDto<List<Cart>> {

        val cartItems =
            cartService
                .getCartItems(userId)

        return ResponseDto(

            status = true,

            message =
                "Cart items fetched successfully",

            data = cartItems
        )
    }

    @PutMapping("/{cartId}")
    fun updateQuantity(

        @PathVariable
        cartId: Long,

        @RequestParam
        quantity: Int

    ): ResponseDto<Cart> {

        val cart =
            cartService
                .updateQuantity(

                    cartId,

                    quantity
                )

        return ResponseDto(

            status = true,

            message =
                "Cart updated successfully",

            data = cart
        )
    }

    @DeleteMapping("/{cartId}")
    fun removeCartItem(

        @PathVariable
        cartId: Long

    ): ResponseDto<Nothing> {

        cartService
            .removeCartItem(cartId)

        return ResponseDto(

            status = true,

            message =
                "Cart item removed successfully",

            data = null
        )
    }
}