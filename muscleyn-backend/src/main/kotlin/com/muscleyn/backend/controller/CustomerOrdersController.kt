package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.OrderDetailsDto
import com.muscleyn.backend.dto.OrderSummaryDto
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.CustomerOrdersService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/customer-orders")
class CustomerOrdersController(

    private val customerOrdersService:
    CustomerOrdersService

) {

    @GetMapping("/my-orders/{userId}")
    fun getMyOrders(

        @PathVariable
        userId: Long

    ): ResponseDto<List<OrderSummaryDto>> {

        val response =

            customerOrdersService
                .getMyOrders(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Orders fetched successfully",

            data = response
        )
    }

    @GetMapping("/{orderId}")
    fun getOrderDetails(

        @PathVariable
        orderId: Long

    ): ResponseDto<OrderDetailsDto> {

        val response =

            customerOrdersService
                .getOrderDetails(
                    orderId
                )

        return ResponseDto(

            status = true,

            message =
                "Order details fetched successfully",

            data = response
        )
    }
}