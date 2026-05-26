package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "cms")
class Cms(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(
        unique = true
    )
    var cmsKey: String? = null,

    @Column(
        columnDefinition = "LONGTEXT"
    )
    var cmsValue: String? = null,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)