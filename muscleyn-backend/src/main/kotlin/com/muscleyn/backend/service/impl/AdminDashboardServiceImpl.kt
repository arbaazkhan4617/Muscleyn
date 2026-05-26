package com.muscleyn.backend.service.impl

import com.muscleyn.backend.response.AdminDashboardDto
import com.muscleyn.backend.repository.CustomerOrdersRepository
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.service.AdminDashboardService
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class AdminDashboardServiceImpl(

    private val customerOrdersRepository:
    CustomerOrdersRepository,

    private val productRepository:
    ProductRepository,

    private val userRepository:
    UserRepository

) : AdminDashboardService {

    override fun getDashboardData():
            AdminDashboardDto {

        val totalRevenue =

            customerOrdersRepository
                .findAll()
                .sumOf {

                    it.finalAmount
                }

        val totalOrders =

            customerOrdersRepository
                .count()

        val totalProducts =

            productRepository
                .count()

        val totalCustomers =

            userRepository
                .count()

        return AdminDashboardDto(

            totalRevenue =
                totalRevenue,

            totalOrders =
                totalOrders,

            totalProducts =
                totalProducts,

            totalCustomers =
                totalCustomers
        )
    }
}