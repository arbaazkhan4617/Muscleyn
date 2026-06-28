package com.muscleyn.backend.service

import com.muscleyn.backend.dto.PaymentConfigDto

interface PaymentConfigService {
    fun getPaymentConfig(): PaymentConfigDto
    fun updatePaymentConfig(dto: PaymentConfigDto): PaymentConfigDto
}
