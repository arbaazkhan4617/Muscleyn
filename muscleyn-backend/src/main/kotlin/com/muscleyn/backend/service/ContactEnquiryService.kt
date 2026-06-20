package com.muscleyn.backend.service

import com.muscleyn.backend.dto.ContactEnquiryRequest
import com.muscleyn.backend.response.ContactEnquiryResponse

interface ContactEnquiryService {

    fun createEnquiry(
        request: ContactEnquiryRequest
    ): ContactEnquiryResponse

    fun getEnquiries(
        status: String?
    ): List<ContactEnquiryResponse>

    fun updateEnquiryStatus(
        id: Long,
        status: String
    ): ContactEnquiryResponse
}
