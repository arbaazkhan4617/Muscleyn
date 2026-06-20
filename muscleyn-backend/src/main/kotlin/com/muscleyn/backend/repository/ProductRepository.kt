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
        :categories IS NULL
        OR LOWER(p.subCategory.category.name) IN :categories
        OR LOWER(p.subCategory.name) IN :categories
    )
    AND (
        :brands IS NULL
        OR LOWER(p.brand.name) IN :brands
    )
    AND (
        :goals IS NULL
        OR (
            'Muscle Gain' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%gainer%' OR LOWER(p.subCategory.name) LIKE '%gainer%' OR LOWER(p.name) LIKE '%gainer%' OR LOWER(p.subCategory.category.name) LIKE '%bulk%' OR LOWER(p.subCategory.name) LIKE '%bulk%' OR LOWER(p.name) LIKE '%bulk%' OR LOWER(p.subCategory.category.name) LIKE '%mass%' OR LOWER(p.subCategory.name) LIKE '%mass%' OR LOWER(p.name) LIKE '%mass%')
        )
        OR (
            'Fat Loss' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%fat%' OR LOWER(p.subCategory.name) LIKE '%fat%' OR LOWER(p.name) LIKE '%fat%' OR LOWER(p.subCategory.category.name) LIKE '%burn%' OR LOWER(p.subCategory.name) LIKE '%burn%' OR LOWER(p.name) LIKE '%burn%' OR LOWER(p.subCategory.category.name) LIKE '%carnitine%' OR LOWER(p.subCategory.name) LIKE '%carnitine%' OR LOWER(p.name) LIKE '%carnitine%' OR LOWER(p.subCategory.category.name) LIKE '%cut%' OR LOWER(p.subCategory.name) LIKE '%cut%' OR LOWER(p.name) LIKE '%cut%' OR LOWER(p.subCategory.category.name) LIKE '%weight management%' OR LOWER(p.subCategory.name) LIKE '%weight management%' OR LOWER(p.name) LIKE '%weight management%')
        )
        OR (
            'Strength' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%creatine%' OR LOWER(p.subCategory.name) LIKE '%creatine%' OR LOWER(p.name) LIKE '%creatine%' OR LOWER(p.subCategory.category.name) LIKE '%strength%' OR LOWER(p.subCategory.name) LIKE '%strength%' OR LOWER(p.name) LIKE '%strength%' OR LOWER(p.subCategory.category.name) LIKE '%power%' OR LOWER(p.subCategory.name) LIKE '%power%' OR LOWER(p.name) LIKE '%power%')
        )
        OR (
            'Recovery' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%recovery%' OR LOWER(p.subCategory.name) LIKE '%recovery%' OR LOWER(p.name) LIKE '%recovery%' OR LOWER(p.subCategory.category.name) LIKE '%bcaa%' OR LOWER(p.subCategory.name) LIKE '%bcaa%' OR LOWER(p.name) LIKE '%bcaa%' OR LOWER(p.subCategory.category.name) LIKE '%casein%' OR LOWER(p.subCategory.name) LIKE '%casein%' OR LOWER(p.name) LIKE '%casein%' OR LOWER(p.subCategory.category.name) LIKE '%glutamine%' OR LOWER(p.subCategory.name) LIKE '%glutamine%' OR LOWER(p.name) LIKE '%glutamine%' OR LOWER(p.subCategory.category.name) LIKE '%amino%' OR LOWER(p.subCategory.name) LIKE '%amino%' OR LOWER(p.name) LIKE '%amino%')
        )
        OR (
            'Energy' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%pre-workout%' OR LOWER(p.subCategory.name) LIKE '%pre-workout%' OR LOWER(p.name) LIKE '%pre-workout%' OR LOWER(p.subCategory.category.name) LIKE '%pre workout%' OR LOWER(p.subCategory.name) LIKE '%pre workout%' OR LOWER(p.name) LIKE '%pre workout%' OR LOWER(p.subCategory.category.name) LIKE '%energy%' OR LOWER(p.subCategory.name) LIKE '%energy%' OR LOWER(p.name) LIKE '%energy%' OR LOWER(p.subCategory.category.name) LIKE '%ignite%' OR LOWER(p.subCategory.name) LIKE '%ignite%' OR LOWER(p.name) LIKE '%ignite%' OR LOWER(p.subCategory.category.name) LIKE '%rage%' OR LOWER(p.subCategory.name) LIKE '%rage%' OR LOWER(p.name) LIKE '%rage%')
        )
        OR (
            'Protein' IN :goals AND (LOWER(p.subCategory.category.name) LIKE '%protein%' OR LOWER(p.subCategory.name) LIKE '%protein%' OR LOWER(p.name) LIKE '%protein%' OR LOWER(p.subCategory.category.name) LIKE '%whey%' OR LOWER(p.subCategory.name) LIKE '%whey%' OR LOWER(p.name) LIKE '%whey%' OR LOWER(p.subCategory.category.name) LIKE '%isolate%' OR LOWER(p.subCategory.name) LIKE '%isolate%' OR LOWER(p.name) LIKE '%isolate%')
        )
    )
    AND (:isBestSeller IS NULL OR p.isBestSeller = :isBestSeller)
    AND (:isOffer IS NULL OR p.isOffer = :isOffer)
    AND (:minPrice IS NULL OR v.price >= :minPrice)
    AND (:maxPrice IS NULL OR v.price <= :maxPrice)
"""
    )
    fun searchProducts(
        @Param("search") search: String?,
        @Param("categories") categories: List<String>?,
        @Param("brands") brands: List<String>?,
        @Param("goals") goals: List<String>?,
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