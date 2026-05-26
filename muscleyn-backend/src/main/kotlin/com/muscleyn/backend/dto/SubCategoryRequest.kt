package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class SubCategoryRequest(

    @field:NotBlank(
        message =
            "Sub category name is required"
    )
    val name: String,

    val imageUrl: String?,

    @field:NotNull(
        message =
            "Category id is required"
    )
    val categoryId: Long?,
)