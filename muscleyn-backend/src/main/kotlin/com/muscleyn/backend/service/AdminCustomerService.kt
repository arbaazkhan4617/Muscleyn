package com.muscleyn.backend.service

import com.muscleyn.backend.entity.User

interface AdminCustomerService {
    fun getAllCustomers(): List<User>
    fun getCustomerById(customerId: Long): User
    fun toggleCustomerStatus(customerId: Long): User
}
