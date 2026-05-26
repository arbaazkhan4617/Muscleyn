package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.NotificationRequest
import com.muscleyn.backend.entity.Notification
import com.muscleyn.backend.repository.NotificationRepository
import com.muscleyn.backend.service.NotificationService
import org.springframework.stereotype.Service

@Service
class NotificationServiceImpl(

    private val notificationRepository:
    NotificationRepository

) : NotificationService {

    override fun createNotification(
        request: NotificationRequest
    ): Notification {

        val notification = Notification(

            userId =
                request.userId,

            title =
                request.title,

            message =
                request.message
        )

        return notificationRepository
            .save(notification)
    }

    override fun getUserNotifications(
        userId: Long
    ): List<Notification> {

        return notificationRepository
            .findByUserIdOrderByIdDesc(
                userId
            )
    }

    override fun markAsRead(
        notificationId: Long
    ): Notification {

        val notification =

            notificationRepository
                .findById(notificationId)

                .orElseThrow {

                    RuntimeException(
                        "Notification not found"
                    )
                }

        notification.isRead = true

        return notificationRepository
            .save(notification)
    }
}