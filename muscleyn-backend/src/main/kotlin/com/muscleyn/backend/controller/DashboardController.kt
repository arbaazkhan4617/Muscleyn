package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.DashboardResponse
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.service.DashboardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/dashboard")
class DashboardController(

    private val dashboardService:
    DashboardService

) {

    @GetMapping
    fun getDashboard():
            ResponseDto<DashboardResponse> {

        val dashboard =
            dashboardService
                .getDashboard()

        return ResponseDto(

            status = true,

            message =
                "Dashboard fetched successfully",

            data = dashboard
        )
    }

    @GetMapping("/low-stock")
    fun getLowStockProducts():

            ResponseDto<
                    List<ProductVariant>
                    > {

        val products =
            dashboardService
                .getLowStockProducts()

        return ResponseDto(

            status = true,

            message =
                "Low stock products fetched successfully",

            data = products
        )
    }

}