package com.muscleyn.backend.response

data class RazorpayOrderResponse(

    val razorpayOrderId:
    String,

    val amount: Int,

    val currency: String,

    val key: String,
)