package com.muscleyn.backend.response

import java.math.BigDecimal

data class AdminDashboardDto(

    val totalRevenue:
        BigDecimal,

    val totalOrders:
        Long,

    val totalProducts:
        Long,

    val totalCustomers:
        Long
)