package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.PaymentTransaction
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentTransactionRepository :
    JpaRepository<PaymentTransaction, Long> {

    fun findByOrderId(
        orderId: Long
    ): List<PaymentTransaction>

    fun findByGatewayOrderId(
        gatewayOrderId: String
    ): PaymentTransaction?

    fun findByGatewayPaymentId(
        gatewayPaymentId: String
    ): PaymentTransaction?
}