package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CreateSubCategoryRequest
import com.muscleyn.backend.entity.SubCategory
import org.springframework.web.multipart.MultipartFile

interface SubCategoryService {

    fun createSubCategory(

        request:
        CreateSubCategoryRequest,

        image:
        MultipartFile?

    ): SubCategory

    fun getAllSubCategories():
            List<SubCategory>

    fun getSubCategoryById(
        subCategoryId: Long
    ): SubCategory

    fun updateSubCategory(

        subCategoryId: Long,

        request:
        CreateSubCategoryRequest,

        image:
        MultipartFile?

    ): SubCategory

    fun deleteSubCategory(
        subCategoryId: Long
    )

    fun toggleSubCategoryStatus(
        subCategoryId: Long
    ): SubCategory
}