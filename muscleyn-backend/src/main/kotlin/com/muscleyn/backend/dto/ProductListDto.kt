package com.muscleyn.backend.dto

data class ProductListDto(

    val id:
        Long?,

    val name:
        String?,

    val imageUrl:
        String?,

    val brandName:
        String?,

    val categoryName:
        String?,

    val subCategoryName:
        String?,

    val active:
        Boolean?
)