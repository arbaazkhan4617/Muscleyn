package com.muscleyn.backend.service.impl

import com.muscleyn.backend.entity.User
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.service.AdminCustomerService
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AdminCustomerServiceImpl(
    private val userRepository: UserRepository
) : AdminCustomerService {

    override fun getAllCustomers(): List<User> {
        return userRepository.findAll().filter { it.role?.name == "ROLE_USER" || it.role == null }
    }

    override fun getCustomerById(customerId: Long): User {
        return userRepository.findById(customerId).orElseThrow {
            RuntimeException("Customer not found")
        }
    }

    override fun toggleCustomerStatus(customerId: Long): User {
        val user = getCustomerById(customerId)
        user.isActive = !(user.isActive ?: true)
        user.updatedAt = LocalDateTime.now()
        return userRepository.save(user)
    }
}
