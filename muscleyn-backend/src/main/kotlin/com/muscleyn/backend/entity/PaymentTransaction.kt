package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.PaymentStatus
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.*

@Entity
@Table(name = "payment_transaction")
class PaymentTransaction(

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    var id: Long? = null,

    var orderId: Long? = null,

    var userId: Long? = null,

    var paymentGateway:
    String? = null,

    var gatewayOrderId:
    String? = null,

    var gatewayPaymentId:
    String? = null,

    var gatewayTransactionId:
    String? = null,

    var gatewaySignature:
    String? = null,

    @Enumerated(
        EnumType.STRING
    )
    var paymentStatus:
    PaymentStatus =
        PaymentStatus.PENDING,

    @Lob
    @Column(
        columnDefinition = "LONGTEXT"
    )
    var gatewayResponse:
    String? = null,

    var failureReason:
    String? = null,

    var retryCount:
    Int = 0,

    var refunded:
    Boolean = false,

    @CreationTimestamp
    var createdAt: Date? = null,

    @UpdateTimestamp
    var updatedAt: Date? = null
)