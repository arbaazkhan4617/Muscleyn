package com.muscleyn.backend.service

import com.muscleyn.backend.response.AdminDashboardDto

interface AdminDashboardService {

    fun getDashboardData():
            AdminDashboardDto
}