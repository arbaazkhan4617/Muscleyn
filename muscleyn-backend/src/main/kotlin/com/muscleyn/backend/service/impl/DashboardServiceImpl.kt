package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.DashboardResponse
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.repository.OrdersRepository
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.service.DashboardService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import com.muscleyn.backend.entity.ProductVariant

@Service
class DashboardServiceImpl(

    private val ordersRepository:
    OrdersRepository,

    private val userRepository:
    UserRepository,

    private val productRepository:
    ProductRepository,

    private val productVariantRepository:
    ProductVariantRepository

) : DashboardService {

    override fun getDashboard():
            DashboardResponse {

        val totalSales =
            ordersRepository
                .getTotalSales()

        return DashboardResponse(

            totalOrders =
                ordersRepository.count(),

            totalSales =
                totalSales,

            totalUsers =
                userRepository.count(),

            totalProducts =
                productRepository.count(),

            pendingOrders =

                ordersRepository
                    .countByOrderStatus(
                        OrderStatus.PLACED
                    ),

            deliveredOrders =

                ordersRepository
                    .countByOrderStatus(
                        OrderStatus.DELIVERED
                    )
        )
    }
    override fun getLowStockProducts():
            List<ProductVariant> {

        return productVariantRepository
            .findByStockLessThanEqualAndIsActiveTrue(
                5
            )
    }
}