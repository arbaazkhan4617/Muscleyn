package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.PaymentConfig
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PaymentConfigRepository : JpaRepository<PaymentConfig, Long>
