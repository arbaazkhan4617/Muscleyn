package com.muscleyn.backend.service.impl

import com.muscleyn.backend.entity.ContactEnquiry
import com.muscleyn.backend.service.EmailNotificationService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailNotificationServiceImpl(

    private val mailSender:
    JavaMailSender,

    @Value("\${contact.email.notifications.enabled:false}")
    private val notificationsEnabled:
    Boolean,

    @Value("\${contact.email.to:}")
    private val contactEmailTo:
    String,

    @Value("\${spring.mail.username:}")
    private val fromEmail:
    String,

) : EmailNotificationService {

    private val logger =
        LoggerFactory.getLogger(
            EmailNotificationServiceImpl::class.java
        )

    override fun sendContactEnquiryNotification(
        enquiry: ContactEnquiry
    ) {

        if (
            !notificationsEnabled ||
            contactEmailTo.isBlank()
        ) {
            return
        }

        try {
            val message =
                SimpleMailMessage()

            message.from =
                fromEmail.ifBlank {
                    contactEmailTo
                }

            message.setTo(contactEmailTo)

            message.subject =
                "New Muscleyn enquiry: ${enquiry.subject}"

            message.text =
                """
                Name: ${enquiry.fullName}
                Email: ${enquiry.email}
                Phone: ${enquiry.phone ?: "N/A"}
                Subject: ${enquiry.subject}

                Message:
                ${enquiry.message}
                """.trimIndent()

            mailSender.send(message)
        } catch (ex: Exception) {
            logger.warn(
                "Contact enquiry email notification failed",
                ex
            )
        }
    }
}
