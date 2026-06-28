package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.PaymentConfigDto
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.PaymentConfigService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/payment-config")
class AdminPaymentConfigController(
    private val paymentConfigService: PaymentConfigService
) {

    @GetMapping
    fun getPaymentConfig(): ResponseEntity<ResponseDto<PaymentConfigDto>> {
        val config = paymentConfigService.getPaymentConfig()
        return ResponseEntity.ok(
            ResponseDto(
                status = true,
                message = "Payment config fetched successfully",
                data = config
            )
        )
    }

    @PutMapping
    fun updatePaymentConfig(@RequestBody dto: PaymentConfigDto): ResponseEntity<ResponseDto<PaymentConfigDto>> {
        val updatedConfig = paymentConfigService.updatePaymentConfig(dto)
        return ResponseEntity.ok(
            ResponseDto(
                status = true,
                message = "Payment config updated successfully",
                data = updatedConfig
            )
        )
    }
}
