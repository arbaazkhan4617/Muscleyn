package com.muscleyn.backend.response

import java.time.LocalDateTime

data class ContactEnquiryResponse(

    val id: Long?,

    val fullName: String?,

    val email: String?,

    val phone: String?,

    val subject: String?,

    val message: String?,

    val status: String?,

    val createdAt: LocalDateTime?,
)
