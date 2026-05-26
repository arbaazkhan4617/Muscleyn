package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.ContactEnquiryRequest
import com.muscleyn.backend.entity.ContactEnquiry
import com.muscleyn.backend.repository.ContactEnquiryRepository
import com.muscleyn.backend.response.ContactEnquiryResponse
import com.muscleyn.backend.service.ContactEnquiryService
import com.muscleyn.backend.service.EmailNotificationService
import org.springframework.stereotype.Service

@Service
class ContactEnquiryServiceImpl(

    private val contactEnquiryRepository:
    ContactEnquiryRepository,

    private val emailNotificationService:
    EmailNotificationService,

) : ContactEnquiryService {

    override fun createEnquiry(
        request: ContactEnquiryRequest
    ): ContactEnquiryResponse {

        val enquiry =
            ContactEnquiry(
                fullName =
                request.fullName?.trim(),
                email =
                request.email?.trim(),
                phone =
                request.phone?.trim(),
                subject =
                request.subject?.trim(),
                message =
                request.message?.trim(),
            )

        val savedEnquiry =
            contactEnquiryRepository
                .save(enquiry)

        emailNotificationService
            .sendContactEnquiryNotification(
                savedEnquiry
            )

        return savedEnquiry.toResponse()
    }

    override fun getEnquiries(
        status: String?
    ): List<ContactEnquiryResponse> {

        val enquiries =
            if (
                status.isNullOrBlank()
            ) {
                contactEnquiryRepository
                    .findAll()
                    .sortedByDescending {
                        it.createdAt
                    }
            } else {
                contactEnquiryRepository
                    .findByStatusOrderByCreatedAtDesc(
                        status
                    )
            }

        return enquiries.map {
            it.toResponse()
        }
    }

    private fun ContactEnquiry.toResponse():
            ContactEnquiryResponse {

        return ContactEnquiryResponse(
            id = id,
            fullName = fullName,
            email = email,
            phone = phone,
            subject = subject,
            message = message,
            status = status,
            createdAt = createdAt,
        )
    }
}
