package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.PaymentConfigDto
import com.muscleyn.backend.entity.PaymentConfig
import com.muscleyn.backend.repository.PaymentConfigRepository
import com.muscleyn.backend.service.PaymentConfigService
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class PaymentConfigServiceImpl(
    private val paymentConfigRepository: PaymentConfigRepository
) : PaymentConfigService {

    override fun getPaymentConfig(): PaymentConfigDto {
        val configs = paymentConfigRepository.findAll()
        val config = if (configs.isNotEmpty()) {
            configs[0]
        } else {
            // Return a default config if not found
            PaymentConfig(
                paymentType = "PERCENTAGE",
                codUpfrontValue = BigDecimal.ZERO,
                onlineUpfrontValue = BigDecimal.ZERO,
                isActive = false
            ).let { paymentConfigRepository.save(it) }
        }

        return PaymentConfigDto(
            id = config.id,
            paymentType = config.paymentType,
            codUpfrontValue = config.codUpfrontValue,
            onlineUpfrontValue = config.onlineUpfrontValue,
            isActive = config.isActive
        )
    }

    override fun updatePaymentConfig(dto: PaymentConfigDto): PaymentConfigDto {
        val configs = paymentConfigRepository.findAll()
        val config = if (configs.isNotEmpty()) {
            configs[0]
        } else {
            PaymentConfig()
        }

        config.paymentType = dto.paymentType
        config.codUpfrontValue = dto.codUpfrontValue
        config.onlineUpfrontValue = dto.onlineUpfrontValue
        config.isActive = dto.isActive

        val saved = paymentConfigRepository.save(config)

        return PaymentConfigDto(
            id = saved.id,
            paymentType = saved.paymentType,
            codUpfrontValue = saved.codUpfrontValue,
            onlineUpfrontValue = saved.onlineUpfrontValue,
            isActive = saved.isActive
        )
    }
}
