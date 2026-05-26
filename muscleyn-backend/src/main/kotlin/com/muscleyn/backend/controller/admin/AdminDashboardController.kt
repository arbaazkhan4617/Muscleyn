package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.response.AdminDashboardDto
import com.muscleyn.backend.service.AdminDashboardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/dashboard")
class AdminDashboardController(

    private val adminDashboardService:
    AdminDashboardService

) {

    @GetMapping
    fun getDashboard():

            ResponseDto<AdminDashboardDto> {

        val response =

            adminDashboardService
                .getDashboardData()

        return ResponseDto(

            status = true,

            message =
                "Dashboard data fetched successfully",

            data = response
        )
    }
}