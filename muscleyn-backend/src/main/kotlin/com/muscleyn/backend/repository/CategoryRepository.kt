package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Category
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository :
    JpaRepository<Category, Long>