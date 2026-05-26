package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "brand")
class Brand(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(
        nullable = false,
        unique = true
    )
    var name: String? = null,

    @Column(
        unique = true
    )
    var slug: String? = null,

    var logoUrl: String? = null,

    var isActive: Boolean? = true,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)