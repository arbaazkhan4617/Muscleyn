package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CouponRequest
import com.muscleyn.backend.entity.Coupon
import com.muscleyn.backend.enums.DiscountType
import com.muscleyn.backend.repository.CouponRepository
import com.muscleyn.backend.service.CouponService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class CouponServiceImpl(

    private val couponRepository:
    CouponRepository

) : CouponService {

    override fun createCoupon(
        request: CouponRequest
    ): Coupon {

        val coupon = Coupon(

            couponCode =
                request.couponCode,

            discountType =
                request.discountType,

            discountValue =
                request.discountValue,

            minimumAmount =
                request.minimumAmount,

            maximumDiscount =
                request.maximumDiscount,

            expiryDate =
                request.expiryDate,

            isActive =
                request.isActive
        )

        return couponRepository
            .save(coupon)
    }

    override fun updateCoupon(

        couponId: Long,

        request: CouponRequest

    ): Coupon {

        val coupon =

            couponRepository
                .findById(couponId)

                .orElseThrow {

                    RuntimeException(
                        "Coupon not found"
                    )
                }

        coupon.couponCode =
            request.couponCode

        coupon.discountType =
            request.discountType

        coupon.discountValue =
            request.discountValue

        coupon.minimumAmount =
            request.minimumAmount

        coupon.maximumDiscount =
            request.maximumDiscount

        coupon.expiryDate =
            request.expiryDate

        coupon.isActive =
            request.isActive

        return couponRepository
            .save(coupon)
    }

    override fun getAllCoupons():
            List<Coupon> {

        return couponRepository
            .findAll()
    }

    override fun applyCoupon(

        couponCode: String,

        amount: BigDecimal

    ): BigDecimal {

        val coupon =

            couponRepository
                .findByCouponCodeAndIsActiveTrue(
                    couponCode
                )

                ?: throw RuntimeException(
                    "Invalid coupon"
                )

        if (

            coupon.expiryDate != null

            &&

            coupon.expiryDate!!
                .isBefore(
                    LocalDateTime.now()
                )

        ) {

            throw RuntimeException(
                "Coupon expired"
            )
        }

        if (

            amount <

            (
                coupon.minimumAmount
                    ?: BigDecimal.ZERO
            )
        ) {

            throw RuntimeException(

                "Minimum order amount not reached"
            )
        }

        return when (
            coupon.discountType
        ) {

            DiscountType.PERCENTAGE -> {

                var discount =

                    amount.multiply(

                        coupon.discountValue!!
                            .divide(
                                BigDecimal(100)
                            )
                    )

                val maxDiscount =

                    coupon.maximumDiscount
                        ?: BigDecimal.ZERO

                if (
                    discount > maxDiscount

                    &&

                    maxDiscount >
                    BigDecimal.ZERO
                ) {

                    discount =
                        maxDiscount
                }

                amount.subtract(discount)
            }

            DiscountType.FLAT -> {

                amount.subtract(
                    coupon.discountValue
                )
            }

            else -> amount
        }
    }

    override fun deleteCoupon(
        couponId: Long
    ) {

        val coupon =

            couponRepository
                .findById(couponId)

                .orElseThrow {

                    RuntimeException(
                        "Coupon not found"
                    )
                }

        couponRepository
            .delete(coupon)
    }
}