package com.muscleyn.backend.service

import com.muscleyn.backend.dto.OrderDetailsDto
import com.muscleyn.backend.dto.OrderSummaryDto

interface CustomerOrdersService {

    fun getMyOrders(
        userId: Long
    ): List<OrderSummaryDto>

    fun getOrderDetails(
        orderId: Long
    ): OrderDetailsDto
}