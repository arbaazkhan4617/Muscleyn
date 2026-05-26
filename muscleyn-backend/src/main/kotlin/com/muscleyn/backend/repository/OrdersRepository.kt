package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Orders
import org.springframework.data.jpa.repository.JpaRepository
import com.muscleyn.backend.enums.OrderStatus
import org.springframework.data.jpa.repository.Query
import java.math.BigDecimal

interface OrdersRepository :
    JpaRepository<Orders, Long> {

    fun findByUserIdOrderByIdDesc(
        userId: Long
    ): List<Orders>

    fun countByOrderStatus(
        orderStatus: OrderStatus
    ): Long

    @Query(
        """
    SELECT COALESCE(
        SUM(o.totalAmount),
        0
    )
    FROM Orders o
    WHERE o.paymentStatus =
    com.muscleyn.backend.enums.PaymentStatus.PAID
"""
    )
    fun getTotalSales():
            BigDecimal
}