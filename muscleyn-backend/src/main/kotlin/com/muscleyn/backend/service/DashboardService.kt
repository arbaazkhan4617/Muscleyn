package com.muscleyn.backend.service

import com.muscleyn.backend.dto.DashboardResponse
import com.muscleyn.backend.entity.ProductVariant

interface DashboardService {

    fun getDashboard():
            DashboardResponse

    fun getLowStockProducts():
            List<ProductVariant>
}