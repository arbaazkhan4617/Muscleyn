package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.SubCategory
import org.springframework.data.jpa.repository.JpaRepository

interface SubCategoryRepository :
    JpaRepository<SubCategory, Long>