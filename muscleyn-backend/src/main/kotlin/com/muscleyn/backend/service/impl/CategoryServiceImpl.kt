package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CreateCategoryRequest
import com.muscleyn.backend.entity.Category
import com.muscleyn.backend.repository.CategoryRepository
import com.muscleyn.backend.service.CategoryService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File

@Service
class CategoryServiceImpl(

    private val categoryRepository:
    CategoryRepository

) : CategoryService {

    @Value("\${file.upload-dir}")
    private lateinit var uploadDir:
            String

    override fun createCategory(

        request:
        CreateCategoryRequest,

        image:
        MultipartFile?

    ): Category {

        val category =
            Category()

        category.name =
            request.name

        category.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        category.isActive =
            request.active

        // IMAGE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadFolder =
                File(uploadDir)

            if (!uploadFolder.exists()) {

                uploadFolder.mkdirs()
            }

            val filePath =

                File(
                    uploadFolder,
                    fileName
                )

            image.transferTo(
                filePath
            )

            category.imageUrl =
                "/uploads/products/$fileName"
        }

        return categoryRepository
            .save(category)
    }

    override fun getAllCategories():
            List<Category> {

        return categoryRepository
            .findAll()
            .sortedByDescending {

                it.id
            }
    }

    override fun getCategoryById(
        categoryId: Long
    ): Category {

        return categoryRepository
            .findById(categoryId)
            .orElseThrow {

                RuntimeException(
                    "Category not found"
                )
            }
    }

    override fun updateCategory(

        categoryId: Long,

        request:
        CreateCategoryRequest,

        image:
        MultipartFile?

    ): Category {

        val category =

            categoryRepository
                .findById(
                    categoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Category not found"
                    )
                }

        category.name =
            request.name

        category.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        category.isActive =
            request.active

        // IMAGE UPDATE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadFolder =
                File(uploadDir)

            if (!uploadFolder.exists()) {

                uploadFolder.mkdirs()
            }

            val filePath =

                File(
                    uploadFolder,
                    fileName
                )

            image.transferTo(
                filePath
            )

            category.imageUrl =
                "/uploads/products/$fileName"
        }

        return categoryRepository
            .save(category)
    }

    override fun deleteCategory(
        categoryId: Long
    ) {

        val category =

            categoryRepository
                .findById(
                    categoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Category not found"
                    )
                }

        categoryRepository
            .delete(category)
    }

    override fun toggleCategoryStatus(
        categoryId: Long
    ): Category {

        val category =

            categoryRepository
                .findById(
                    categoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Category not found"
                    )
                }

        category.isActive =
            !(category.isActive ?: true)

        return categoryRepository
            .save(category)
    }
}