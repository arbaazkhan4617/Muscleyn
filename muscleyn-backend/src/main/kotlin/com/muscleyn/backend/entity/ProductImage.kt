package com.muscleyn.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "product_image")
class ProductImage(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var imageUrl: String? = null,

    var sequenceNumber: Int? = 0,

    @ManyToOne
    @JoinColumn(name = "product_id")

    @JsonIgnore
    var product: Product? = null
)