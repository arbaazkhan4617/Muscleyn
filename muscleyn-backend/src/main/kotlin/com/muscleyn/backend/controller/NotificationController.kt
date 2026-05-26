package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.NotificationRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Notification
import com.muscleyn.backend.service.NotificationService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notifications")
class NotificationController(

    private val notificationService:
    NotificationService

) {

    @PostMapping
    fun createNotification(

        @Valid
        @RequestBody
        request: NotificationRequest

    ): ResponseDto<Notification> {

        val notification =
            notificationService
                .createNotification(
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Notification created successfully",

            data = notification
        )
    }

    @GetMapping("/{userId}")
    fun getUserNotifications(

        @PathVariable
        userId: Long

    ): ResponseDto<List<Notification>> {

        val notifications =
            notificationService
                .getUserNotifications(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Notifications fetched successfully",

            data = notifications
        )
    }

    @PutMapping("/read/{notificationId}")
    fun markAsRead(

        @PathVariable
        notificationId: Long

    ): ResponseDto<Notification> {

        val notification =
            notificationService
                .markAsRead(
                    notificationId
                )

        return ResponseDto(

            status = true,

            message =
                "Notification marked as read",

            data = notification
        )
    }
}