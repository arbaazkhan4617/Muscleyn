package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "review")
class Review(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var productId: Long? = null,

    var rating: Double? = 0.0,

    @Column(
        columnDefinition = "LONGTEXT"
    )
    var reviewText:
    String? = null,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),
)