package com.muscleyn.backend.config

import com.razorpay.RazorpayClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RazorpayConfig(

    @Value("\${razorpay.key.id}")
    private val keyId: String,

    @Value("\${razorpay.key.secret}")
    private val keySecret: String

) {

    @Bean
    fun razorpayClient():
            RazorpayClient {

        return RazorpayClient(
            keyId,
            keySecret
        )
    }
}