package com.muscleyn.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "order_item")
class OrderItem(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "order_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )
    var order: Orders? = null,

    @ManyToOne
    @JoinColumn(name = "variant_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )
    var variant:
    ProductVariant? = null,

    var quantity: Int? = 0,

    var price:
    BigDecimal? = BigDecimal.ZERO,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),
)