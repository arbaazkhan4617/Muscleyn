package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.CustomerOrders
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerOrdersRepository :
    JpaRepository<CustomerOrders, Long> {

    fun findByUserIdOrderByIdDesc(
        userId: Long
    ): List<CustomerOrders>
}