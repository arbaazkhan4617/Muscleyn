package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Brand
import org.springframework.data.jpa.repository.JpaRepository

interface BrandRepository :
    JpaRepository<Brand, Long>