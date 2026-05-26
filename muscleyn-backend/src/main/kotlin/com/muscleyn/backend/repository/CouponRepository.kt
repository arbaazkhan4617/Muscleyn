package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Coupon
import org.springframework.data.jpa.repository.JpaRepository

interface CouponRepository :
    JpaRepository<Coupon, Long> {

    fun findByCouponCodeAndIsActiveTrue(
        couponCode: String
    ): Coupon?
}