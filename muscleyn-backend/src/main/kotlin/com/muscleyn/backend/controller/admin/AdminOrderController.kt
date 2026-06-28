package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Orders
import com.muscleyn.backend.enums.OrderStatus
import com.muscleyn.backend.enums.PaymentStatus
import com.muscleyn.backend.service.OrderService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/orders")
class AdminOrderController(
    private val orderService: OrderService
) {

    @GetMapping
    fun getAllOrders(): ResponseDto<List<Orders>> {
        val orders = orderService.getAllOrders()
        return ResponseDto(
            status = true,
            message = "All orders fetched successfully",
            data = orders
        )
    }

    @PatchMapping("/status/{orderId}")
    fun updateOrderStatus(
        @PathVariable orderId: Long,
        @RequestParam orderStatus: OrderStatus
    ): ResponseDto<Orders> {
        val order = orderService.updateOrderStatus(orderId, orderStatus)
        return ResponseDto(
            status = true,
            message = "Order status updated successfully",
            data = order
        )
    }

    @PatchMapping("/payment-status/{orderId}")
    fun updatePaymentStatus(
        @PathVariable orderId: Long,
        @RequestParam paymentStatus: PaymentStatus
    ): ResponseDto<Orders> {
        val order = orderService.updatePaymentStatus(orderId, paymentStatus)
        return ResponseDto(
            status = true,
            message = "Payment status updated successfully",
            data = order
        )
    }
    
    @DeleteMapping("/{orderId}")
    fun deleteOrder(
        @PathVariable orderId: Long
    ): ResponseDto<Nothing> {
        orderService.deleteOrder(orderId)
        return ResponseDto(
            status = true,
            message = "Order deleted successfully",
            data = null
        )
    }
}
