package com.muscleyn.backend.service


import com.muscleyn.backend.dto.request.PlaceOrderRequest
import com.muscleyn.backend.entity.OrderItem
import com.muscleyn.backend.entity.Orders
import com.muscleyn.backend.enums.OrderStatus

interface OrderService {

    fun placeOrder(
        request: PlaceOrderRequest
    ): Orders

    fun getUserOrders(
        userId: Long
    ): List<Orders>

    fun getOrderItems(
        orderId: Long
    ): List<OrderItem>

    fun updateOrderStatus(

        orderId: Long,

        orderStatus: OrderStatus

    ): Orders
    
    fun getAllOrders(): List<Orders>
    
    fun deleteOrder(orderId: Long)
}