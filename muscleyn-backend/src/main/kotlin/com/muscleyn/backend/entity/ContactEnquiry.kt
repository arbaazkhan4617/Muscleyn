package com.muscleyn.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "contact_enquiries")
class ContactEnquiry(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(nullable = false)
    var fullName: String? = null,

    @Column(nullable = false)
    var email: String? = null,

    var phone: String? = null,

    @Column(nullable = false)
    var subject: String? = null,

    @Column(
        nullable = false,
        columnDefinition = "LONGTEXT"
    )
    var message: String? = null,

    var status: String? = "NEW",

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),
) 
