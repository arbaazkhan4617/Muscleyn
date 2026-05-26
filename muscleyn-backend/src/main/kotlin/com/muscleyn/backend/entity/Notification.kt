package com.muscleyn.backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "notification")
class Notification(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var title: String? = null,

    @Column(
        columnDefinition = "LONGTEXT"
    )
    var message:
    String? = null,

    var isRead:
    Boolean? = false,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),
)