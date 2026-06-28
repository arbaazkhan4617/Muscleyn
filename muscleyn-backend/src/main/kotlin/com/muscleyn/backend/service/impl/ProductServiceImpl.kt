package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CreateProductRequest
import com.muscleyn.backend.dto.ProductRequest
import com.muscleyn.backend.entity.Category
import com.muscleyn.backend.entity.Product
import com.muscleyn.backend.entity.ProductImage
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.service.ProductService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.data.domain.Sort
import java.lang.RuntimeException
import com.muscleyn.backend.repository.CategoryRepository
import com.muscleyn.backend.repository.BrandRepository
import com.muscleyn.backend.repository.ProductImagesRepository
import com.muscleyn.backend.repository.SubCategoryRepository
import com.muscleyn.backend.response.ProductResponse
import com.muscleyn.backend.util.toResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.multipart.MultipartFile
import java.io.File

@Service
class ProductServiceImpl(
    private val productRepository:
    ProductRepository,

    private val subCategoryRepository:
    SubCategoryRepository,
    private val brandRepository:
    BrandRepository,


    private val categoryRepository:
    CategoryRepository,

    private val productImagesRepository: ProductImagesRepository

) : ProductService {

    @Value("\${file.upload-dir}")
    private lateinit var uploadDirPath: String

    override fun createProduct(
        request: ProductRequest
    ): ProductResponse {
        val subCategory =

            subCategoryRepository
                .findById(
                    request.subCategoryId!!
                )

                .orElseThrow {

                    RuntimeException(
                        "Sub category not found"
                    )
                }

        val brand =

            if (
                request.brandId != null
            ) {

                brandRepository
                    .findById(
                        request.brandId
                    )

                    .orElseThrow {

                        RuntimeException(
                            "Brand not found"
                        )
                    }

            } else {

                null
            }

        val product = Product(

            name = request.name,

            description =
                request.description,


            subCategory = subCategory,

            brand = brand,

            imageUrl = request.imageUrl,

            isBestSeller = request.isBestSeller ?: false,

            isOffer = request.isOffer ?: false,

            productReportUrl = request.productReportUrl,
        )

        return productRepository.save(
            product
        ).toResponse()
    }

    override fun getAllProducts():
            List<ProductResponse> {

        return productRepository.findAll().map {

            it.toResponse()
        }
    }

    override fun getAllProducts(
        page: Int,
        size: Int
    ): Page<ProductResponse> {

        val pageable =
            PageRequest.of(page, size)

        return productRepository
            .findByIsActiveTrue(
                pageable
            )

            .map {

                it.toResponse()
            }
    }

    override fun searchProducts(
        search: String?,
        categories: List<String>?,
        brands: List<String>?,
        goals: List<String>?,
        isBestSeller: Boolean?,
        isOffer: Boolean?,
        minPrice: Double?,
        maxPrice: Double?,
        page: Int,
        size: Int,
        sortBy: String,
        direction: String
    ): Page<ProductResponse> {
        val mappedSortBy = when (sortBy) {
            "price" -> "variants.price"
            "popularity" -> "id"
            "latest" -> "createdAt"
            else -> sortBy
        }
        val sort = if (direction.equals("desc", true)) {
            Sort.by(mappedSortBy).descending()
        } else {
            Sort.by(mappedSortBy).ascending()
        }

        val pageable = PageRequest.of(page, size, sort)

        val catList = if (categories.isNullOrEmpty()) null else categories.map { it.lowercase() }
        val brandList = if (brands.isNullOrEmpty()) null else brands.map { it.lowercase() }
        val goalList = if (goals.isNullOrEmpty()) null else goals

        return productRepository.searchProducts(
            search,
            catList,
            brandList,
            goalList,
            isBestSeller,
            isOffer,
            minPrice,
            maxPrice,
            pageable
        ).map {
            it.toResponse()
        }
    }

    override fun getProductById(
        productId: Long
    ): ProductResponse {

        return productRepository
            .findById(productId)

            .orElseThrow {

                RuntimeException(
                    "Product not found"
                )
            } .toResponse()
    }

    override fun updateProduct(

        productId: Long,

        request: ProductRequest

    ): ProductResponse {

        val subCategory =

            subCategoryRepository
                .findById(
                    request.subCategoryId!!
                )

                .orElseThrow {

                    RuntimeException(
                        "Sub category not found"
                    )
                }
        val brand =

            if (
                request.brandId != null
            ) {

                brandRepository
                    .findById(
                        request.brandId
                    )

                    .orElseThrow {

                        RuntimeException(
                            "Brand not found"
                        )
                    }

            } else {

                null
            }
        val product =
            productRepository
                .findById(productId)

                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        product.name =
            request.name

        product.description =
            request.description

        product.subCategory =
            subCategory

        product.brand =
            brand

        product.imageUrl =
            request.imageUrl

        product.isBestSeller = request.isBestSeller ?: false

        product.isOffer = request.isOffer ?: false

        product.productReportUrl = request.productReportUrl

        product.updatedAt = java.time.LocalDateTime.now()

        return productRepository.save(
            product
        ).toResponse()
    }

    override fun deleteProduct(
        productId: Long
    ) {

        val product =
            productRepository
                .findById(productId)

                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        product.isActive = false

        productRepository.save(
            product
        )
    }

    override fun createProduct(

        request:
        CreateProductRequest,

        image:
        MultipartFile?,

        images:
        List<MultipartFile>?,

        productReport: MultipartFile?

    ): Product {

        // BRAND
        val brand =

            brandRepository
                .findById(
                    request.brandId
                )
                .orElseThrow {

                    RuntimeException(
                        "Brand not found"
                    )
                }


        // SUB CATEGORY
        val subCategory =

            request.subCategoryId
                ?.let {

                    subCategoryRepository
                        .findById(it)
                        .orElse(null)
                }

        // PRODUCT
        val product =
            Product()

        product.name =
            request.name

        product.description =
            request.description

        product.brand =
            brand

        product.subCategory =
            subCategory

        product.isActive =
            request.active

        product.nutrition =
            request.nutrition

        product.benefits =
            request.benefits

        product.isBestSeller = request.isBestSeller ?: false

        product.isBestSeller = request.isBestSeller ?: false

        product.isOffer = request.isOffer ?: false
        
        product.amazonUrl = request.amazonUrl
        
        product.flipkartUrl = request.flipkartUrl

        // IMAGE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadDir =
                File(  uploadDirPath).absoluteFile

            if (!uploadDir.exists()) {

                uploadDir.mkdirs()
            }

            val filePath =

                File(
                    uploadDir,
                    fileName
                )

            image.transferTo(
                filePath
            )

            product.imageUrl =
                "/uploads/products/$fileName"
        }

        // PRODUCT REPORT (PDF)
        if (productReport != null) {
            val fileName = System.currentTimeMillis().toString() + "_" + productReport.originalFilename
            val uploadDir = File(uploadDirPath).absoluteFile
            if (!uploadDir.exists()) {
                uploadDir.mkdirs()
            }
            val filePath = File(uploadDir, fileName)
            productReport.transferTo(filePath)
            product.productReportUrl = "/uploads/products/$fileName"
        }

        val product1 =  productRepository
            .save(product)

        if (images != null) {
            images.forEach { image1->

                val fileName =

                    System.currentTimeMillis()
                        .toString() +

                            "_" +

                            image1.originalFilename

                val uploadDir =
                    File(  uploadDirPath).absoluteFile

                if (!uploadDir.exists()) {

                    uploadDir.mkdirs()
                }

                val filePath =

                    File(
                        uploadDir,
                        fileName
                    )

                image1.transferTo(
                    filePath
                )

                val prodImgUrl =
                    "/uploads/products/$fileName"

                val prodImg = ProductImage(imageUrl = prodImgUrl, product =  product1)

                productImagesRepository.save(prodImg)
            }

        }
        return product1;
    }

    override fun updateProduct(

        productId: Long,

        request: CreateProductRequest,

        image: MultipartFile?,


        images:
        List<MultipartFile>?,

        productReport: MultipartFile?

    ): Product {

        val product =

            productRepository
                .findById(
                    productId
                )
                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        // BRAND
        val brand =

            brandRepository
                .findById(
                    request.brandId
                )
                .orElseThrow {

                    RuntimeException(
                        "Brand not found"
                    )
                }

        // SUB CATEGORY
        val subCategory =

            request.subCategoryId
                ?.let {

                    subCategoryRepository
                        .findById(it)
                        .orElse(null)
                }

        // UPDATE
        product.name =
            request.name

        product.description =
            request.description

        product.brand =
            brand

        product.subCategory =
            subCategory

        product.isActive =
            request.active

        product.nutrition =
            request.nutrition

        product.benefits =
            request.benefits

        product.isBestSeller = request.isBestSeller ?: false

        product.isBestSeller = request.isBestSeller ?: false

        product.isOffer = request.isOffer ?: false
        
        product.amazonUrl = request.amazonUrl
        
        product.flipkartUrl = request.flipkartUrl

        product.updatedAt = java.time.LocalDateTime.now()

        // IMAGE UPDATE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadDir =
                File(  uploadDirPath).absoluteFile

            if (!uploadDir.exists()) {

                uploadDir.mkdirs()
            }

            val filePath =

                File(
                    uploadDir,
                    fileName
                )

            image.transferTo(
                filePath
            )

            product.imageUrl =
                "/uploads/products/$fileName"
        }

        // PRODUCT REPORT UPDATE (PDF)
        if (productReport != null) {
            val fileName = System.currentTimeMillis().toString() + "_" + productReport.originalFilename
            val uploadDir = File(uploadDirPath).absoluteFile
            if (!uploadDir.exists()) {
                uploadDir.mkdirs()
            }
            val filePath = File(uploadDir, fileName)
            productReport.transferTo(filePath)
            product.productReportUrl = "/uploads/products/$fileName"
        }

        val product1 =  productRepository
            .save(product)

        if (images != null) {
            images.forEach { image1->

                val fileName =

                    System.currentTimeMillis()
                        .toString() +

                            "_" +

                            image1.originalFilename

                val uploadDir =
                    File(  uploadDirPath).absoluteFile

                if (!uploadDir.exists()) {

                    uploadDir.mkdirs()
                }

                val filePath =

                    File(
                        uploadDir,
                        fileName
                    )

                image1.transferTo(
                    filePath
                )

                val prodImgUrl =
                    "/uploads/products/$fileName"

                val prodImg = ProductImage(imageUrl = prodImgUrl, product =  product1)

                productImagesRepository.save(prodImg)
            }

        }

        return product1
    }

    override fun deleteProductImage(imageId: Long) {
        productImagesRepository.deleteById(imageId)
    }

    override fun toggleBestSeller(productId: Long): ProductResponse {
        val product = productRepository.findById(productId)
            .orElseThrow { RuntimeException("Product not found") }
        product.isBestSeller = !(product.isBestSeller ?: false)
        product.updatedAt = java.time.LocalDateTime.now()
        return productRepository.save(product).toResponse()
    }

    override fun toggleOffer(productId: Long): ProductResponse {
        val product = productRepository.findById(productId)
            .orElseThrow { RuntimeException("Product not found") }
        product.isOffer = !(product.isOffer ?: false)
        product.updatedAt = java.time.LocalDateTime.now()
        return productRepository.save(product).toResponse()
    }

    override fun updateProductReport(
        productId: Long,
        productReport: MultipartFile,
        reportProteinPercentage: String?,
        reportHeavyMetal: String?,
        reportAminoAcidProfile: String?,
        reportMicrobialSafety: String?,
        reportTestDetails: String?
    ): ProductResponse {
        val product = productRepository.findById(productId)
            .orElseThrow { RuntimeException("Product not found") }
        
        val fileName = System.currentTimeMillis().toString() + "_" + productReport.originalFilename
        val uploadDir = File(uploadDirPath).absoluteFile
        if (!uploadDir.exists()) {
            uploadDir.mkdirs()
        }
        val filePath = File(uploadDir, fileName)
        productReport.transferTo(filePath)
        product.productReportUrl = "/uploads/products/$fileName"
        if (reportProteinPercentage != null) product.reportProteinPercentage = reportProteinPercentage
        if (reportHeavyMetal != null) product.reportHeavyMetal = reportHeavyMetal
        if (reportAminoAcidProfile != null) product.reportAminoAcidProfile = reportAminoAcidProfile
        if (reportMicrobialSafety != null) product.reportMicrobialSafety = reportMicrobialSafety
        if (reportTestDetails != null) product.reportTestDetails = reportTestDetails
        product.updatedAt = java.time.LocalDateTime.now()
        
        return productRepository.save(product).toResponse()
    }

    override fun deleteProductReport(productId: Long): ProductResponse {
        val product = productRepository.findById(productId)
            .orElseThrow { RuntimeException("Product not found") }
        product.productReportUrl = null
        product.updatedAt = java.time.LocalDateTime.now()
        return productRepository.save(product).toResponse()
    }
}