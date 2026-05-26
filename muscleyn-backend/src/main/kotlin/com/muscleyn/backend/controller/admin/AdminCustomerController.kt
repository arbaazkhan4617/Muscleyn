package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.User
import com.muscleyn.backend.service.AdminCustomerService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin/customers")
class AdminCustomerController(
    private val adminCustomerService: AdminCustomerService
) {

    @GetMapping
    fun getAllCustomers(): ResponseDto<List<User>> {
        val customers = adminCustomerService.getAllCustomers()
        return ResponseDto(
            status = true,
            message = "Customers fetched successfully",
            data = customers
        )
    }

    @GetMapping("/{id}")
    fun getCustomerById(@PathVariable id: Long): ResponseDto<User> {
        val customer = adminCustomerService.getCustomerById(id)
        return ResponseDto(
            status = true,
            message = "Customer fetched successfully",
            data = customer
        )
    }

    @PatchMapping("/toggle-status/{id}")
    fun toggleCustomerStatus(@PathVariable id: Long): ResponseDto<User> {
        val customer = adminCustomerService.toggleCustomerStatus(id)
        return ResponseDto(
            status = true,
            message = "Customer status toggled successfully",
            data = customer
        )
    }
}
