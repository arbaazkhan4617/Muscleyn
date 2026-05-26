package com.muscleyn.backend.repository


import com.muscleyn.backend.dto.CreatePaymentRequest
import com.muscleyn.backend.response.PaymentOrderResponse

interface PaymentService {

    fun createPayment(

        request:
        CreatePaymentRequest

    ): PaymentOrderResponse
}