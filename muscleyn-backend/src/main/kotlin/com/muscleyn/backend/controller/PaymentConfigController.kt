package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.PaymentConfigDto
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.PaymentConfigService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/payment-config")
class PaymentConfigController(
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
}
