package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.ProductImage
import org.springframework.data.jpa.repository.JpaRepository

interface ProductImagesRepository : JpaRepository<ProductImage, Long> {
}