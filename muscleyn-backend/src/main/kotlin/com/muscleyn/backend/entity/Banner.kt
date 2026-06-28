package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "banner")
class Banner(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var title: String? = null,

    var eyebrow: String? = null,

    var subtitle: String? = null,

    @Column(
        columnDefinition = "LONGTEXT"
    )
    var imageUrl: String? = null,

    @Column(
        columnDefinition = "LONGTEXT"
    )
    var boxImageUrl: String? = null,

    var redirectUrl:
    String? = null,

    var sortOrder: Int? = 0,

    var isActive: Boolean? = true,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)