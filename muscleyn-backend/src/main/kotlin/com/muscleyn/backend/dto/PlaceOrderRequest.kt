package com.muscleyn.backend.dto.request

import com.muscleyn.backend.dto.PlaceOrderItemRequest
import com.muscleyn.backend.enums.PaymentMethod

data class PlaceOrderRequest(

    val userId: Long,

    val addressId: Long? = null,

    val paymentMethod:
    PaymentMethod,

    val paymentGateway:
    String? = null,

    val items:
    List<PlaceOrderItemRequest>,

    val couponCode:
    String? = null
)