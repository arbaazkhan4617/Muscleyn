package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.AddressType
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.Date

@Entity
@Table(name = "user_address")
class UserAddress(

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var fullName: String? = null,

    var mobileNumber: String? = null,

    var addressLine1: String? = null,

    var addressLine2: String? = null,

    var landmark: String? = null,

    var city: String? = null,

    var state: String? = null,

    var country: String? = null,

    var pincode: String? = null,

    @Enumerated(
        EnumType.STRING
    )
    var addressType:
        AddressType? = null,

    var isDefault: Boolean = false,

    var isActive: Boolean = true,

    @CreationTimestamp
    var createdAt: Date? = null,

    @UpdateTimestamp
    var updatedAt: Date? = null
)