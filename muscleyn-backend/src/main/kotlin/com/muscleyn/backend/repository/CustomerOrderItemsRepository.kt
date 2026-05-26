package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.CustomerOrderItems
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerOrderItemsRepository :
    JpaRepository<CustomerOrderItems, Long> {

    fun findByOrderId(
        orderId: Long
    ): List<CustomerOrderItems>
}