package com.muscleyn.backend.entity

import com.muscleyn.backend.enums.AddressType
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "address")
class Address(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    var userId: Long? = null,

    var fullName: String? = null,

    var mobileNumber: String? = null,

    var pincode: String? = null,

    var state: String? = null,

    var city: String? = null,

    var houseNo: String? = null,

    var area: String? = null,

    var landmark: String? = null,

    @Enumerated(
        EnumType.STRING
    )
    var addressType:
    AddressType? = null,

    var isDefault: Boolean? = false,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)