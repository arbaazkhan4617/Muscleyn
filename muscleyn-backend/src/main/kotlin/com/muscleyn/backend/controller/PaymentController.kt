package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CreatePaymentRequest
import com.muscleyn.backend.dto.CreatePaymentResponse
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.dto.VerifyPaymentRequest
import com.muscleyn.backend.response.PaymentOrderResponse
import com.muscleyn.backend.service.PaymentService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/payments")
class PaymentController(

    private val paymentService:
    PaymentService

) {

    @PostMapping("/create")
    fun createPayment(

        @Valid
        @RequestBody
        request: CreatePaymentRequest

    ): ResponseDto<PaymentOrderResponse> {

        val payment =
            paymentService
                .createPayment(request)

        return ResponseDto(

            status = true,

            message =
                "Payment created successfully",

            data = payment
        )
    }

    @PostMapping("/verify")
    fun verifyPayment(

        @Valid
        @RequestBody
        request: VerifyPaymentRequest

    ): ResponseDto<String> {

        val response =
            paymentService
                .verifyPayment(
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Payment verified successfully",

            data = response
        )
    }
}