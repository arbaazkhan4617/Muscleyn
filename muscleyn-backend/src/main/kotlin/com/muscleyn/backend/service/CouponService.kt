package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CouponRequest
import com.muscleyn.backend.entity.Coupon
import java.math.BigDecimal

interface CouponService {

    fun createCoupon(
        request: CouponRequest
    ): Coupon

    fun updateCoupon(

        couponId: Long,

        request: CouponRequest

    ): Coupon

    fun getAllCoupons():
            List<Coupon>

    fun applyCoupon(

        couponCode: String,

        amount: BigDecimal

    ): BigDecimal

    fun deleteCoupon(
        couponId: Long
    )
}