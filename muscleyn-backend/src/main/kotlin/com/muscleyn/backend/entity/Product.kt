package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonIgnore

@Entity
@Table(name = "product")
class Product(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(nullable = false)
    var name: String? = null,

    @Column(columnDefinition = "TEXT")
    var description: String? = null,

    @ManyToOne
    @JoinColumn(name = "sub_category_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )

    var subCategory:
    SubCategory? = null,

    @ManyToOne
    @JoinColumn(name = "brand_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )

    var brand: Brand? = null,

    var imageUrl: String? = null,

    var isActive: Boolean? = true,
    var isBestSeller: Boolean? = false,
    var isOffer: Boolean? = false,
    @OneToMany(
        mappedBy = "product"
    )

    @JsonIgnore
    var variants:
    MutableList<ProductVariant> =
        mutableListOf(),

    @OneToMany(
        mappedBy = "product",
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )

    var productImages:
    MutableList<ProductImage> =
        mutableListOf(),

    var createdAt: LocalDateTime? = LocalDateTime.now(),

    var updatedAt: LocalDateTime? = LocalDateTime.now(),

    @Column(columnDefinition = "TEXT")
    var nutrition: String? = null,

    @Column(columnDefinition = "TEXT")
    var benefits: String? = null,

    var productReportUrl: String? = null,

    var reportProteinPercentage: String? = "Pass",
    var reportHeavyMetal: String? = "Pass",
    var reportAminoAcidProfile: String? = "Pass",
    var reportMicrobialSafety: String? = "Pass",

    @Column(columnDefinition = "TEXT")
    var reportTestDetails: String? = null,

    var showManufactureDetails: Boolean? = true,
)