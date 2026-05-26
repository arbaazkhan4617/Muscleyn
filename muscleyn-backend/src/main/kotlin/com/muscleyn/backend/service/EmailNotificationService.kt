package com.muscleyn.backend.service

import com.muscleyn.backend.entity.ContactEnquiry

interface EmailNotificationService {

    fun sendContactEnquiryNotification(
        enquiry: ContactEnquiry
    )
}
