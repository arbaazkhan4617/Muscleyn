package com.muscleyn.backend.response

data class ProductResponse(

    val id: Long?,

    val name: String?,

    val description: String?,

    val imageUrl: String?,

    val categoryId: Long?,

    val categoryName: String?,

    val subCategoryId: Long?,

    val subCategoryName: String?,

    val brandId: Long?,

    val brandName: String?,

    val variants:
    List<ProductVariantResponse>?,
    val isActive : Boolean?,
    val productImages: List<ProductImageResponse>?,
    val nutrition: String?,
    val benefits: String?,
    val isBestSeller: Boolean?,
    val isOffer: Boolean?,
    val createdAt: java.time.LocalDateTime?,
    val updatedAt: java.time.LocalDateTime?
)

data class ProductImageResponse(
    val id: Long?,
    val imageUrl: String?,
    val sequenceNumber: Int?
)