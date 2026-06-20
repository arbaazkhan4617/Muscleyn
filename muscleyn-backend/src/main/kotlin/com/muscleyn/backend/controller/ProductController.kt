package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CreateProductRequest
import com.muscleyn.backend.dto.ProductRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Product
import com.muscleyn.backend.response.ProductResponse
import com.muscleyn.backend.service.ProductService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*
import jakarta.validation.Valid

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/products")
class ProductController(
    private val productService: ProductService
) {

    @PostMapping
    fun createProduct(
        @Valid
        @RequestBody request: ProductRequest
    ): ResponseDto<ProductResponse> {

        val product = productService.createProduct(
            request
        )

        return ResponseDto(

            status = true,

            message = "Product created successfully",

            data = product
        )
    }

    @GetMapping
    fun getAllProducts(

        @RequestParam(
            defaultValue = "0"
        ) page: Int,

        @RequestParam(
            defaultValue = "10"
        ) size: Int,

        ): ResponseDto<Page<ProductResponse>> {

        val products = productService.getAllProducts(
            page, size
        )

        return ResponseDto(

            status = true,

            message = "Products fetched successfully",

            data = products
        )
    }


    @GetMapping("/search")
    fun searchProducts(
        @RequestParam(required = false) search: String?,
        @RequestParam(required = false) categories: List<String>?,
        @RequestParam(required = false) brands: List<String>?,
        @RequestParam(required = false) goals: List<String>?,
        @RequestParam(required = false) isBestSeller: Boolean?,
        @RequestParam(required = false) isOffer: Boolean?,
        @RequestParam(required = false) minPrice: Double?,
        @RequestParam(required = false) maxPrice: Double?,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(defaultValue = "id") sortBy: String,
        @RequestParam(defaultValue = "desc") direction: String,
    ): ResponseDto<Page<ProductResponse>> {
        val products = productService.searchProducts(
            search,
            categories,
            brands,
            goals,
            isBestSeller,
            isOffer,
            minPrice,
            maxPrice,
            page,
            size,
            sortBy,
            direction
        )

        return ResponseDto(

            status = true,

            message = "Products fetched successfully",

            data = products
        )
    }

    @GetMapping("/{productId}")
    fun getProductById(

        @PathVariable
        productId: Long

    ): ResponseDto<ProductResponse> {

        val product =
            productService
                .getProductById(
                    productId
                )

        return ResponseDto(

            status = true,

            message =
                "Product fetched successfully",

            data = product
        )
    }

    @PutMapping("/{productId}")
    fun updateProduct(

        @PathVariable
        productId: Long,

        @Valid
        @RequestBody
        request: ProductRequest

    ): ResponseDto<ProductResponse> {

        val product =
            productService
                .updateProduct(

                    productId,

                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Product updated successfully",

            data = product
        )
    }


    @DeleteMapping("/{productId}")
    fun deleteProduct(

        @PathVariable
        productId: Long

    ): ResponseDto<Nothing> {

        productService.deleteProduct(
            productId
        )

        return ResponseDto(

            status = true,

            message =
                "Product deleted successfully",

            data = null
        )
    }

    @PostMapping(
        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun createProduct(

        @RequestParam
        name: String,

        @RequestParam(
            required = false
        )
        description: String?,

        @RequestParam
        brandId: Long,

        @RequestParam(
            required = false
        )
        subCategoryId: Long?,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?,

        @RequestPart(
            required = false
        )
        images: List<MultipartFile>?,

        @RequestParam(
            required = false
        )
        nutrition: String?,

        @RequestParam(
            required = false
        )
        benefits: String?,

        @RequestParam(
            required = false
        )
        isBestSeller: Boolean?,

        @RequestParam(
            required = false
        )
        isOffer: Boolean?

    ): ResponseDto<Product>{

        val request =

            CreateProductRequest(

                name = name,

                description =
                    description,

                brandId =
                    brandId,

                subCategoryId =
                    subCategoryId,

                active =
                    active,

                nutrition =
                    nutrition,

                benefits =
                    benefits,

                isBestSeller =
                    isBestSeller ?: false,

                isOffer =
                    isOffer ?: false
            )

        val response =

            productService
                .createProduct(

                    request,

                    image,
                    images
                )

        return ResponseDto(

            status = true,

            message =
                "Product created successfully",

            data = response
        )
    }

    @PutMapping(

        value = ["/update/{productId}"],

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun updateProduct(

        @PathVariable
        productId: Long,

        @RequestParam
        name: String,

        @RequestParam(
            required = false
        )
        description: String?,

        @RequestParam
        brandId: Long,

        @RequestParam(
            required = false
        )
        subCategoryId: Long?,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?,

        @RequestPart(
            required = false
        )
        images: List<MultipartFile>?,

        @RequestParam(
            required = false
        )
        nutrition: String?,

        @RequestParam(
            required = false
        )
        benefits: String?,

        @RequestParam(
            required = false
        )
        isBestSeller: Boolean?,

        @RequestParam(
            required = false
        )
        isOffer: Boolean?

    ): ResponseDto<Product> {

        val request =

            CreateProductRequest(

                name = name,

                description =
                    description,

                brandId =
                    brandId,

                subCategoryId =
                    subCategoryId,

                active =
                    active,

                nutrition =
                    nutrition,

                benefits =
                    benefits,

                isBestSeller =
                    isBestSeller ?: false,

                isOffer =
                    isOffer ?: false
            )

        val response =

            productService
                .updateProduct(

                    productId,

                    request,

                    image,

                    images
                )

        return ResponseDto(

            status = true,

            message =
                "Product updated successfully",

            data = response
        )
    }

    @DeleteMapping("/images/{imageId}")
    fun deleteProductImage(
        @PathVariable imageId: Long
    ): ResponseDto<Nothing> {
        productService.deleteProductImage(imageId)
        return ResponseDto(
            status = true,
            message = "Product image deleted successfully",
            data = null
        )
    }

    @PutMapping("/{productId}/toggle-best-seller")
    fun toggleBestSeller(
        @PathVariable productId: Long
    ): ResponseDto<ProductResponse> {
        val product = productService.toggleBestSeller(productId)
        return ResponseDto(
            status = true,
            message = "Best seller status toggled successfully",
            data = product
        )
    }

    @PutMapping("/{productId}/toggle-offer")
    fun toggleOffer(
        @PathVariable productId: Long
    ): ResponseDto<ProductResponse> {
        val product = productService.toggleOffer(productId)
        return ResponseDto(
            status = true,
            message = "Offer status toggled successfully",
            data = product
        )
    }
}