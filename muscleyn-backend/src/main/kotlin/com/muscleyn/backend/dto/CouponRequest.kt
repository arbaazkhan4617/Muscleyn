package com.muscleyn.backend.dto

import com.muscleyn.backend.enums.DiscountType
import java.math.BigDecimal
import java.time.LocalDateTime

data class CouponRequest(

    val couponCode: String,

    val discountType:
    DiscountType,

    val discountValue:
    BigDecimal,

    val minimumAmount:
    BigDecimal?,

    val maximumDiscount:
    BigDecimal?,

    val expiryDate:
    LocalDateTime?,

    val isActive: Boolean?,
)