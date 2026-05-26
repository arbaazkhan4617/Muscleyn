package com.muscleyn.backend.controller


import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.OrderItem
import com.muscleyn.backend.entity.Orders
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.service.OrderService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
class OrderController(

    private val orderService:
    OrderService

) {

    @PostMapping
    fun placeOrder(

        @Valid
        @RequestBody
        request: PlaceOrderRequest

    ): ResponseDto<Orders> {

        val order =
            orderService
                .placeOrder(request)

        return ResponseDto(

            status = true,

            message =
                "Order placed successfully",

            data = order
        )
    }

    @GetMapping("/{userId}")
    fun getUserOrders(

        @PathVariable
        userId: Long

    ): ResponseDto<List<Orders>> {

        val orders =
            orderService
                .getUserOrders(
                    userId
                )

        return ResponseDto(

            status = true,

            message =
                "Orders fetched successfully",

            data = orders
        )
    }

    @GetMapping("/items/{orderId}")
    fun getOrderItems(

        @PathVariable
        orderId: Long

    ): ResponseDto<List<OrderItem>> {

        val items =
            orderService
                .getOrderItems(orderId)

        return ResponseDto(

            status = true,

            message =
                "Order items fetched successfully",

            data = items
        )
    }

    @PutMapping(
        "/status/{orderId}"
    )
    fun updateOrderStatus(

        @PathVariable
        orderId: Long,

        @RequestParam
        orderStatus: OrderStatus

    ): ResponseDto<Orders> {

        val order =
            orderService
                .updateOrderStatus(

                    orderId,

                    orderStatus
                )

        return ResponseDto(

            status = true,

            message =
                "Order status updated successfully",

            data = order
        )
    }

}