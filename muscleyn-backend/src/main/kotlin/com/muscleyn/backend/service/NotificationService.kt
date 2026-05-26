package com.muscleyn.backend.service

import com.muscleyn.backend.dto.NotificationRequest
import com.muscleyn.backend.entity.Notification

interface NotificationService {

    fun createNotification(
        request: NotificationRequest
    ): Notification

    fun getUserNotifications(
        userId: Long
    ): List<Notification>

    fun markAsRead(
        notificationId: Long
    ): Notification
}