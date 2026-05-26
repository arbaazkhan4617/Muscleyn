package com.muscleyn.backend.dto

import java.math.BigDecimal

data class DashboardResponse(

    val totalOrders: Long,

    val totalSales:
    BigDecimal,

    val totalUsers: Long,

    val totalProducts: Long,

    val pendingOrders: Long,

    val deliveredOrders: Long,
)