package com.muscleyn.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "cart")
class Cart(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var quantity: Int? = 1,

    @ManyToOne
    @JoinColumn(name = "variant_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )
    var variant:
    ProductVariant? = null,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)