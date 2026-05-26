package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CreateCategoryRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Category
import com.muscleyn.backend.service.CategoryService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/categories")
class CategoryController(

    private val categoryService:
    CategoryService

) {

    @PostMapping(

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun createCategory(

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<Category> {

        val request =

            CreateCategoryRequest(

                name = name,

                active = active
            )

        val response =

            categoryService
                .createCategory(

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Category created successfully",

            data = response
        )
    }

    @GetMapping
    fun getAllCategories():

            ResponseDto<
                    List<Category>
                    > {

        val response =

            categoryService
                .getAllCategories()

        return ResponseDto(

            status = true,

            message =
                "Categories fetched successfully",

            data = response
        )
    }

    @GetMapping("/{categoryId}")
    fun getCategoryById(

        @PathVariable
        categoryId: Long

    ): ResponseDto<Category> {

        val response =

            categoryService
                .getCategoryById(
                    categoryId
                )

        return ResponseDto(

            status = true,

            message =
                "Category fetched successfully",

            data = response
        )
    }

    @PutMapping(

        value = ["/{categoryId}"],

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun updateCategory(

        @PathVariable
        categoryId: Long,

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<Category> {

        val request =

            CreateCategoryRequest(

                name = name,

                active = active
            )

        val response =

            categoryService
                .updateCategory(

                    categoryId,

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Category updated successfully",

            data = response
        )
    }

    @DeleteMapping("/{categoryId}")
    fun deleteCategory(

        @PathVariable
        categoryId: Long

    ): ResponseDto<Nothing> {

        categoryService
            .deleteCategory(
                categoryId
            )

        return ResponseDto(

            status = true,

            message =
                "Category deleted successfully",

            data = null
        )
    }

    @PatchMapping(
        "/toggle-status/{categoryId}"
    )
    fun toggleCategoryStatus(

        @PathVariable
        categoryId: Long

    ): ResponseDto<Category> {

        val response =

            categoryService
                .toggleCategoryStatus(
                    categoryId
                )

        return ResponseDto(

            status = true,

            message =
                "Category status updated",

            data = response
        )
    }
}