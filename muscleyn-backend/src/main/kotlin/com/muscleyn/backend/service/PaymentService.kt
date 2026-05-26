package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CreatePaymentRequest
import com.muscleyn.backend.dto.CreatePaymentResponse
import com.muscleyn.backend.dto.VerifyPaymentRequest
import com.muscleyn.backend.response.PaymentOrderResponse

interface PaymentService {

    fun createPayment(
        request: CreatePaymentRequest
    ): PaymentOrderResponse

    fun verifyPayment(
        request: VerifyPaymentRequest
    ): String
}