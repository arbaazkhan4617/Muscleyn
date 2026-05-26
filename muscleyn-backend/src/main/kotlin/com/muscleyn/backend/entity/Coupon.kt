package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.DiscountType
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "coupon")
class Coupon(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(
        unique = true
    )
    var couponCode:
    String? = null,

    @Enumerated(
        EnumType.STRING
    )
    var discountType:
    DiscountType? = null,

    var discountValue:
    BigDecimal? = BigDecimal.ZERO,

    var minimumAmount:
    BigDecimal? = BigDecimal.ZERO,

    var maximumDiscount:
    BigDecimal? = BigDecimal.ZERO,

    var expiryDate:
    LocalDateTime? = null,

    var isActive:
    Boolean? = true,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),
)