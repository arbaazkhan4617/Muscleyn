package com.muscleyn.backend.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.math.BigDecimal
import java.util.*

@Entity
@Table(name = "customer_order_items")
class CustomerOrderItems(

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    var id: Long? = null,

    var orderId: Long? = null,

    var productId: Long? = null,

    var variantId: Long? = null,

    var productName: String? = null,

    var variantName: String? = null,

    @Column(
        precision = 19,
        scale = 4
    )
    var price:
        BigDecimal =
            BigDecimal.ZERO,

    @Column(
        precision = 19,
        scale = 4
    )
    var quantity:
        BigDecimal =
            BigDecimal.ZERO,

    @Column(
        precision = 19,
        scale = 4
    )
    var totalAmount:
        BigDecimal =
            BigDecimal.ZERO,

    var productImage:
        String? = null,

    @CreationTimestamp
    var createdAt: Date? = null
)