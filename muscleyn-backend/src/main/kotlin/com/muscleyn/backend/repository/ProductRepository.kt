package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface ProductRepository :
    JpaRepository<Product, Long>
{
    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.brand = null WHERE p.brand.id = :brandId")
    fun dissociateBrand(@Param("brandId") brandId: Long)

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.subCategory = null WHERE p.subCategory.id = :subCategoryId")
    fun dissociateSubCategory(@Param("subCategoryId") subCategoryId: Long)


    @Query(
        """
    SELECT DISTINCT p FROM Product p
    LEFT JOIN p.variants v
    WHERE p.isActive = true
    AND (
        :search IS NULL
        OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))
    )
    AND (
        :category IS NULL
        OR LOWER(p.subCategory.category.name) LIKE LOWER(CONCAT('%', :category, '%'))
        OR LOWER(p.subCategory.name) LIKE LOWER(CONCAT('%', :category, '%'))
    )
    AND (
        :brand IS NULL
        OR LOWER(p.brand.name) LIKE LOWER(CONCAT('%', :brand, '%'))
    )
    AND (:isBestSeller IS NULL OR p.isBestSeller = :isBestSeller)
    AND (:isOffer IS NULL OR p.isOffer = :isOffer)
    AND (:minPrice IS NULL OR v.price >= :minPrice)
    AND (:maxPrice IS NULL OR v.price <= :maxPrice)
"""
    )
    fun searchProducts(
        @Param("search") search: String?,
        @Param("category") category: String?,
        @Param("brand") brand: String?,
        @Param("isBestSeller") isBestSeller: Boolean?,
        @Param("isOffer") isOffer: Boolean?,
        @Param("minPrice") minPrice: Double?,
        @Param("maxPrice") maxPrice: Double?,
        pageable: Pageable
    ): Page<Product>

    fun findByIsActiveTrue(
        pageable: Pageable
    ): Page<Product>

    fun findByNameContainingIgnoreCase(

        name: String,

        pageable: Pageable

    ): Page<Product>
}