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
    val isActive : Boolean?
)