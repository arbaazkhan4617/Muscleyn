package com.muscleyn.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "product_variant")
class ProductVariant(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(nullable = false)
    var variantName: String? = null,

    var sku: String? = null,

    var imageUrl: String? = null,

    @Column(nullable = false)
    var price: BigDecimal? = null,
    var oldPrice: BigDecimal? = null,
    var discountPercent: BigDecimal? = null,
    var stock: Int? = 0,

    var size: String? = null,

    var color: String? = null,

    var weight: String? = null,

    var flavor: String? = null,

    var isActive: Boolean? = true,

    @ManyToOne
    @JoinColumn(name = "product_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )
    var product: Product? = null,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var amazonUrl: String? = null,

    var flipkartUrl: String? = null,
)