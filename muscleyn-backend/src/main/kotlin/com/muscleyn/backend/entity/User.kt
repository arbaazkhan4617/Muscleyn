package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.UserRole
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(nullable = false)
    var name: String? = null,

    @Column(
        nullable = false,
        unique = true
    )
    var mobileNumber: String? = null,

    var email: String? = null,

    var password: String? = null,

    @Enumerated(
        EnumType.STRING
    )
    var role:
    UserRole? =
        UserRole.ROLE_USER,

    var isActive: Boolean? = true,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)