package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Notification
import org.springframework.data.jpa.repository.JpaRepository

interface NotificationRepository :
    JpaRepository<Notification, Long> {

    fun findByUserIdOrderByIdDesc(
        userId: Long
    ): List<Notification>
}