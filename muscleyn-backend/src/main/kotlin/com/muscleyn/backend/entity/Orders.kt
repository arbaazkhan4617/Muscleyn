package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentGateway
import com.muscleyn.backend.enums.PaymentMethod
import com.muscleyn.backend.enums.PaymentStatus
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "orders")
class Orders(

    @Id
    var id: Long? = null,

    var userId: Long? = null,

    var addressId: Long? = null,

    var totalAmount:
    BigDecimal? = BigDecimal.ZERO,

    @Enumerated(
        EnumType.STRING
    )
    var paymentStatus:
    PaymentStatus? =
        PaymentStatus.PENDING,

    @Enumerated(
        EnumType.STRING
    )
    var orderStatus:
    OrderStatus? =
        OrderStatus.PLACED,


    @Enumerated(
        EnumType.STRING
    )
    var paymentMethod:
    PaymentMethod? =
        PaymentMethod.COD,

    @Enumerated(
        EnumType.STRING
    )
   var paymentGateway: PaymentGateway?= PaymentGateway.RAZORPAY,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)