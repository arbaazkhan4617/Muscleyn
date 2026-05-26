package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CreateSubCategoryRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.SubCategory
import com.muscleyn.backend.service.SubCategoryService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/sub-categories")
class SubCategoryController(

    private val subCategoryService:
    SubCategoryService

) {

    @PostMapping(

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun createSubCategory(

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestParam
        categoryId: Long,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<SubCategory> {

        val request =

            CreateSubCategoryRequest(

                name = name,

                active = active,

                categoryId =
                    categoryId
            )

        val response =

            subCategoryService
                .createSubCategory(

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Sub category created successfully",

            data = response
        )
    }

    @GetMapping
    fun getAllSubCategories():

            ResponseDto<
                    List<SubCategory>
                    > {

        val response =

            subCategoryService
                .getAllSubCategories()

        return ResponseDto(

            status = true,

            message =
                "Sub categories fetched successfully",

            data = response
        )
    }

    @GetMapping("/{subCategoryId}")
    fun getSubCategoryById(

        @PathVariable
        subCategoryId: Long

    ): ResponseDto<SubCategory> {

        val response =

            subCategoryService
                .getSubCategoryById(
                    subCategoryId
                )

        return ResponseDto(

            status = true,

            message =
                "Sub category fetched successfully",

            data = response
        )
    }

    @PutMapping(

        value = ["/{subCategoryId}"],

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun updateSubCategory(

        @PathVariable
        subCategoryId: Long,

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestParam
        categoryId: Long,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<SubCategory> {

        val request =

            CreateSubCategoryRequest(

                name = name,

                active = active,

                categoryId =
                    categoryId
            )

        val response =

            subCategoryService
                .updateSubCategory(

                    subCategoryId,

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Sub category updated successfully",

            data = response
        )
    }

    @DeleteMapping("/{subCategoryId}")
    fun deleteSubCategory(

        @PathVariable
        subCategoryId: Long

    ): ResponseDto<Nothing> {

        subCategoryService
            .deleteSubCategory(
                subCategoryId
            )

        return ResponseDto(

            status = true,

            message =
                "Sub category deleted successfully",

            data = null
        )
    }

    @PatchMapping(
        "/toggle-status/{subCategoryId}"
    )
    fun toggleSubCategoryStatus(

        @PathVariable
        subCategoryId: Long

    ): ResponseDto<SubCategory> {

        val response =

            subCategoryService
                .toggleSubCategoryStatus(
                    subCategoryId
                )

        return ResponseDto(

            status = true,

            message =
                "Sub category status updated",

            data = response
        )
    }
}