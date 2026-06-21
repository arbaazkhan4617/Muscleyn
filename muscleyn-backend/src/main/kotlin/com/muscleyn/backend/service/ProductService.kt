package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CreateProductRequest
import com.muscleyn.backend.dto.ProductRequest
import com.muscleyn.backend.entity.Product
import com.muscleyn.backend.response.ProductResponse
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.web.multipart.MultipartFile

interface ProductService {

    fun createProduct(
        request: ProductRequest
    ): ProductResponse

    fun getAllProducts():
            List<ProductResponse>

    fun getAllProducts(
        page: Int,
        size: Int
    ): Page<ProductResponse>;

    fun searchProducts(
        search: String?,
        categories: List<String>?,
        brands: List<String>?,
        goals: List<String>?,
        isBestSeller: Boolean?,
        isOffer: Boolean?,
        minPrice: Double?,
        maxPrice: Double?,
        page: Int,
        size: Int,
        sortBy: String,
        direction: String
    ): Page<ProductResponse>

    fun getProductById(
        productId: Long
    ): ProductResponse

    fun updateProduct(

        productId: Long,

        request: ProductRequest

    ): ProductResponse

    fun deleteProduct(
        productId: Long
    )

    fun createProduct(

        request:
        CreateProductRequest,

        image:
        MultipartFile?,

        images: List<MultipartFile>?,

        productReport: MultipartFile?

    ): Product

    fun updateProduct(

        productId: Long,

        request: CreateProductRequest,

        image: MultipartFile?,

        images: List<MultipartFile>?,

        productReport: MultipartFile?

    ): Product

    fun deleteProductImage(imageId: Long)

    fun toggleBestSeller(productId: Long): ProductResponse

    fun toggleOffer(productId: Long): ProductResponse

    fun updateProductReport(
        productId: Long,
        productReport: MultipartFile,
        reportProteinPercentage: String?,
        reportHeavyMetal: String?,
        reportAminoAcidProfile: String?,
        reportMicrobialSafety: String?,
        reportTestDetails: String?
    ): ProductResponse

    fun deleteProductReport(productId: Long): ProductResponse
}