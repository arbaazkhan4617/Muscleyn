package com.muscleyn.backend.dto

import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentMethod
import com.muscleyn.backend.enums.PaymentStatus
import java.math.BigDecimal
import java.util.*

data class OrderSummaryDto(

    val id: Long?,
    
    val orderNumber: String?,

    val finalAmount:
        BigDecimal,

    val paymentMethod:
        PaymentMethod?,

    val paymentStatus:
        PaymentStatus?,

    val orderStatus:
        OrderStatus?,

    val createdAt:
        Date?
)