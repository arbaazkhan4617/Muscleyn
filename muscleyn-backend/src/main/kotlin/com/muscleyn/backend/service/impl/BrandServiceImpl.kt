package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.BrandRequest
import com.muscleyn.backend.entity.Brand
import com.muscleyn.backend.repository.BrandRepository
import com.muscleyn.backend.service.BrandService
import org.springframework.stereotype.Service

import com.muscleyn.backend.dto.CreateBrandRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.multipart.MultipartFile
import java.io.File

@Service
class BrandServiceImpl(

    private val brandRepository:
    BrandRepository

) : BrandService {

    @Value("\${file.upload-dir}")
    private lateinit var uploadDir:
            String


    override fun createBrand(
        request: BrandRequest
    ): Brand {

        val slug = request.name

            .lowercase()

            .replace(" ", "-")

        val brand = Brand(

            name = request.name,

            slug = slug,

            logoUrl =
                request.logoUrl
        )

        return brandRepository
            .save(brand)
    }



    override fun createBrand(

        request:
        CreateBrandRequest,

        image:
        MultipartFile?

    ): Brand {

        val brand =
            Brand()

        brand.name =
            request.name

        brand.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        brand.isActive =
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

            brand.logoUrl =
                "/uploads/products/$fileName"
        }

        return brandRepository
            .save(brand)
    }

    override fun getAllBrands():
            List<Brand> {

        return brandRepository
            .findAll()
            .sortedByDescending {

                it.id
            }
    }

    override fun getBrandById(
        brandId: Long
    ): Brand {

        return brandRepository
            .findById(brandId)
            .orElseThrow {

                RuntimeException(
                    "Brand not found"
                )
            }
    }

    override fun updateBrand(

        brandId: Long,

        request:
        CreateBrandRequest,

        image:
        MultipartFile?

    ): Brand {

        val brand =

            brandRepository
                .findById(
                    brandId
                )
                .orElseThrow {

                    RuntimeException(
                        "Brand not found"
                    )
                }

        brand.name =
            request.name

        brand.slug =
            request.name
                .lowercase()
                .replace(" ", "-")

        brand.isActive =
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

            brand.logoUrl =
                "/uploads/products/$fileName"
        }

        return brandRepository
            .save(brand)
    }

    override fun deleteBrand(
        brandId: Long
    ) {

        val brand =

            brandRepository
                .findById(
                    brandId
                )
                .orElseThrow {

                    RuntimeException(
                        "Brand not found"
                    )
                }

        brandRepository
            .delete(brand)
    }

    override fun toggleBrandStatus(
        brandId: Long
    ): Brand {

        val brand =

            brandRepository
                .findById(
                    brandId
                )
                .orElseThrow {

                    RuntimeException(
                        "Brand not found"
                    )
                }

        brand.isActive =
            !(brand.isActive ?: true)

        return brandRepository
            .save(brand)
    }
}