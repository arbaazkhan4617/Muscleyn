package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentMethod
import com.muscleyn.backend.enums.PaymentStatus
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.math.BigDecimal
import java.util.*

@Entity
@Table(name = "customer_orders")
class CustomerOrders(

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var addressId: Long? = null,

    @Column(
        precision = 19,
        scale = 4
    )
    var totalAmount:
        BigDecimal =
            BigDecimal.ZERO,

    @Column(
        precision = 19,
        scale = 4
    )
    var deliveryCharge:
        BigDecimal =
            BigDecimal.ZERO,

    @Column(
        precision = 19,
        scale = 4
    )
    var discountAmount:
        BigDecimal =
            BigDecimal.ZERO,

    @Column(
        precision = 19,
        scale = 4
    )
    var finalAmount:
        BigDecimal =
            BigDecimal.ZERO,

    @Enumerated(
        EnumType.STRING
    )
    var paymentMethod:
        PaymentMethod? = null,

    @Enumerated(
        EnumType.STRING
    )
    var paymentStatus:
        PaymentStatus =
            PaymentStatus.PENDING,

    @Enumerated(
        EnumType.STRING
    )
    var orderStatus:
        OrderStatus =
            OrderStatus.PENDING,

    var paymentGateway:
        String? = null,

    var transactionId:
        String? = null,

    @CreationTimestamp
    var createdAt: Date? = null
)