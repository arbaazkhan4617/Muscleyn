package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProductRepository :
    JpaRepository<Product, Long>
{

    @Query(
        """
    SELECT p FROM Product p

    WHERE p.isActive = true

    AND
    (
        :search IS NULL
        OR LOWER(p.name)
        LIKE LOWER(
            CONCAT('%', :search, '%')
        )
    )

    AND
    (
        :category IS NULL
        OR LOWER(
            p.subCategory.category.name
        )
        LIKE LOWER(
            CONCAT('%', :category, '%')
        )
    )

    AND
    (
        :brand IS NULL
        OR LOWER(p.brand.name)
        LIKE LOWER(
            CONCAT('%', :brand, '%')
        )
    )
"""
    )
    fun searchProducts(

        @Param("search")
        search: String?,

        @Param("category")
        category: String?,

        @Param("brand")
        brand: String?,

        pageable: Pageable,

        ): Page<Product>

    fun findByIsActiveTrue(
        pageable: Pageable
    ): Page<Product>

    fun findByNameContainingIgnoreCase(

        name: String,

        pageable: Pageable

    ): Page<Product>
}