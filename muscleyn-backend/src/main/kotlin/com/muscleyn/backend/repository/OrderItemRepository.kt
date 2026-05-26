package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.OrderItem
import org.springframework.data.jpa.repository.JpaRepository

interface OrderItemRepository :
    JpaRepository<OrderItem, Long> {

    fun findByOrderId(
        orderId: Long
    ): List<OrderItem>
}