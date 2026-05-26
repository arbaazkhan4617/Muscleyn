package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CouponRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Coupon
import com.muscleyn.backend.service.CouponService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal

@RestController
@RequestMapping("/api/coupons")
class CouponController(

    private val couponService:
    CouponService

) {

    @PostMapping
    fun createCoupon(

        @Valid
        @RequestBody
        request: CouponRequest

    ): ResponseDto<Coupon> {

        val coupon =
            couponService
                .createCoupon(request)

        return ResponseDto(

            status = true,

            message =
                "Coupon created successfully",

            data = coupon
        )
    }

    @PutMapping("/{couponId}")
    fun updateCoupon(

        @PathVariable
        couponId: Long,

        @Valid
        @RequestBody
        request: CouponRequest

    ): ResponseDto<Coupon> {

        val coupon =
            couponService
                .updateCoupon(

                    couponId,

                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Coupon updated successfully",

            data = coupon
        )
    }

    @GetMapping
    fun getAllCoupons():
            ResponseDto<List<Coupon>> {

        val coupons =
            couponService
                .getAllCoupons()

        return ResponseDto(

            status = true,

            message =
                "Coupons fetched successfully",

            data = coupons
        )
    }

    @GetMapping("/apply")
    fun applyCoupon(

        @RequestParam
        couponCode: String,

        @RequestParam
        amount: BigDecimal

    ): ResponseDto<BigDecimal> {

        val finalAmount =
            couponService
                .applyCoupon(

                    couponCode,

                    amount
                )

        return ResponseDto(

            status = true,

            message =
                "Coupon applied successfully",

            data = finalAmount
        )
    }

    @DeleteMapping("/{couponId}")
    fun deleteCoupon(

        @PathVariable
        couponId: Long

    ): ResponseDto<Nothing> {

        couponService
            .deleteCoupon(
                couponId
            )

        return ResponseDto(

            status = true,

            message =
                "Coupon deleted successfully",

            data = null
        )
    }
}