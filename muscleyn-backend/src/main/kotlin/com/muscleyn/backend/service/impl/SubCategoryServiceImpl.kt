package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CreateSubCategoryRequest
import com.muscleyn.backend.entity.SubCategory
import com.muscleyn.backend.repository.CategoryRepository
import com.muscleyn.backend.repository.SubCategoryRepository
import com.muscleyn.backend.service.SubCategoryService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File

@Service
class SubCategoryServiceImpl(

    private val subCategoryRepository:
    SubCategoryRepository,

    private val categoryRepository:
    CategoryRepository

) : SubCategoryService {

    @Value("\${file.upload-dir}")
    private lateinit var uploadDir:
            String

    override fun createSubCategory(

        request:
        CreateSubCategoryRequest,

        image:
        MultipartFile?

    ): SubCategory {

        val category =

            categoryRepository
                .findById(
                    request.categoryId
                )

                .orElseThrow {

                    RuntimeException(
                        "Category not found"
                    )
                }

        val subCategory =
            SubCategory()

        subCategory.name =
            request.name

        subCategory.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        subCategory.category =
            category

        subCategory.isActive =
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

            subCategory.imageUrl =
                "/uploads/products/$fileName"
        }

        return subCategoryRepository
            .save(subCategory)
    }

    override fun getAllSubCategories():
            List<SubCategory> {

        return subCategoryRepository
            .findAll()
            .sortedByDescending {

                it.id
            }
    }

    override fun getSubCategoryById(
        subCategoryId: Long
    ): SubCategory {

        return subCategoryRepository
            .findById(
                subCategoryId
            )
            .orElseThrow {

                RuntimeException(
                    "Sub category not found"
                )
            }
    }

    override fun updateSubCategory(

        subCategoryId: Long,

        request:
        CreateSubCategoryRequest,

        image:
        MultipartFile?

    ): SubCategory {

        val subCategory =

            subCategoryRepository
                .findById(
                    subCategoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Sub category not found"
                    )
                }

        val category =

            categoryRepository
                .findById(
                    request.categoryId
                )

                .orElseThrow {

                    RuntimeException(
                        "Category not found"
                    )
                }

        subCategory.name =
            request.name

        subCategory.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        subCategory.category =
            category

        subCategory.isActive =
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

            subCategory.imageUrl =
                "/uploads/products/$fileName"
        }

        return subCategoryRepository
            .save(subCategory)
    }

    override fun deleteSubCategory(
        subCategoryId: Long
    ) {

        val subCategory =

            subCategoryRepository
                .findById(
                    subCategoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Sub category not found"
                    )
                }

        subCategoryRepository
            .delete(subCategory)
    }

    override fun toggleSubCategoryStatus(
        subCategoryId: Long
    ): SubCategory {

        val subCategory =

            subCategoryRepository
                .findById(
                    subCategoryId
                )
                .orElseThrow {

                    RuntimeException(
                        "Sub category not found"
                    )
                }

        subCategory.isActive =
            !(subCategory.isActive ?: true)

        return subCategoryRepository
            .save(subCategory)
    }
}