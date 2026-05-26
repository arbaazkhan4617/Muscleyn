package com.muscleyn.backend.service

import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.CustomerOrders

interface PlaceOrderService {

    fun placeOrder(
        request: PlaceOrderRequest
    ): CustomerOrders
}