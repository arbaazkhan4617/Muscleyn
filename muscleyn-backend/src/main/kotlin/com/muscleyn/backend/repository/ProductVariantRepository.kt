package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.ProductVariant
import org.springframework.data.jpa.repository.JpaRepository

interface ProductVariantRepository :
    JpaRepository<ProductVariant, Long>
{
    fun findByProductIdAndIsActiveTrue(
        productId: Long
    ): List<ProductVariant>



    fun findByStockLessThanEqualAndIsActiveTrue(
        stock: Int
    ): List<ProductVariant>

    fun findByProductId(

        productId: Long

    ): List<ProductVariant>
}