package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.ContactEnquiry
import org.springframework.data.jpa.repository.JpaRepository

interface ContactEnquiryRepository :
    JpaRepository<ContactEnquiry, Long> {

    fun findByStatusOrderByCreatedAtDesc(
        status: String
    ): List<ContactEnquiry>
}
