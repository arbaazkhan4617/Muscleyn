package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.ContactEnquiryRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.response.ContactEnquiryResponse
import com.muscleyn.backend.service.ContactEnquiryService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/contact")
class ContactController(

    private val contactEnquiryService:
    ContactEnquiryService

) {

    @PostMapping("/enquiries")
    fun createEnquiry(

        @Valid
        @RequestBody
        request: ContactEnquiryRequest

    ): ResponseDto<ContactEnquiryResponse> {

        val enquiry =
            contactEnquiryService
                .createEnquiry(request)

        return ResponseDto(
            status = true,
            message =
            "Enquiry submitted successfully",
            data = enquiry
        )
    }

    @GetMapping("/enquiries")
    fun getEnquiries(

        @RequestParam(required = false)
        status: String?

    ): ResponseDto<List<ContactEnquiryResponse>> {

        val enquiries =
            contactEnquiryService
                .getEnquiries(status)

        return ResponseDto(
            status = true,
            message =
            "Enquiries fetched successfully",
            data = enquiries
        )
    }

    @PutMapping("/enquiries/{id}/status")
    fun updateEnquiryStatus(
        @PathVariable id: Long,
        @RequestParam status: String
    ): ResponseDto<ContactEnquiryResponse> {
        val updated = contactEnquiryService.updateEnquiryStatus(id, status)
        return ResponseDto(
            status = true,
            message = "Enquiry status updated successfully",
            data = updated
        )
    }
}
