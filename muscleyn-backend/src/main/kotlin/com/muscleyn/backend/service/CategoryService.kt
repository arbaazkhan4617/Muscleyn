package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CreateCategoryRequest
import com.muscleyn.backend.entity.Category
import org.springframework.web.multipart.MultipartFile

interface CategoryService {

    fun createCategory(

        request:
        CreateCategoryRequest,

        image:
        MultipartFile?

    ): Category

    fun getAllCategories():
            List<Category>

    fun getCategoryById(
        categoryId: Long
    ): Category

    fun updateCategory(

        categoryId: Long,

        request:
        CreateCategoryRequest,

        image:
        MultipartFile?

    ): Category

    fun deleteCategory(
        categoryId: Long
    )

    fun toggleCategoryStatus(
        categoryId: Long
    ): Category
}