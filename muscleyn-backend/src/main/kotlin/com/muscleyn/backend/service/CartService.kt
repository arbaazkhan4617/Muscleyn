package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CartRequest
import com.muscleyn.backend.entity.Cart

interface CartService {

    fun addToCart(
        request: CartRequest
    ): Cart

    fun getCartItems(
        userId: Long
    ): List<Cart>

    fun updateQuantity(

        cartId: Long,

        quantity: Int

    ): Cart

    fun removeCartItem(
        cartId: Long
    )
}