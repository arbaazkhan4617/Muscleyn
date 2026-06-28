package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.math.BigDecimal

@Entity
@Table(name = "payment_config")
class PaymentConfig(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    // "FLAT" or "PERCENTAGE"
    var paymentType: String = "PERCENTAGE",

    @Column(precision = 19, scale = 4)
    var codUpfrontValue: BigDecimal = BigDecimal.ZERO,

    @Column(precision = 19, scale = 4)
    var onlineUpfrontValue: BigDecimal = BigDecimal.ZERO,

    var isActive: Boolean = false
)
