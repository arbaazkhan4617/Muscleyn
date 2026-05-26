package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CreateProductVariantRequest
import com.muscleyn.backend.dto.ProductVariantRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.service.ProductVariantService
import jakarta.validation.Valid
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/product-variants")
class ProductVariantController(

    private val productVariantService:
    ProductVariantService

) {

    @PostMapping("/test")
    fun createVariant(

        @Valid
        @RequestBody
        request: ProductVariantRequest

    ): ResponseDto<ProductVariant> {

        val variant =
            productVariantService
                .createVariant(
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Variant created successfully",

            data = variant
        )
    }



    @PutMapping("/{variantId}")
    fun updateVariant(

        @PathVariable
        variantId: Long,

        @Valid
        @RequestBody
        request: ProductVariantRequest

    ): ResponseDto<ProductVariant> {

        val variant =
            productVariantService
                .updateVariant(

                    variantId,

                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Variant updated successfully",

            data = variant
        )
    }




    // CREATE
    @PostMapping(
        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun createVariant(

        @RequestParam
        variantName: String,

        @RequestParam(
            required = false
        )
        sku: String?,

        @RequestParam
        price: String,

        @RequestParam(
            required = false
        )
        oldPrice: String?,

        @RequestParam(
            required = false
        )
        discountPercent: String?,

        @RequestParam(
            required = false
        )
        stock: Int?,

        @RequestParam(
            required = false
        )
        size: String?,

        @RequestParam(
            required = false
        )
        color: String?,

        @RequestParam(
            required = false
        )
        weight: String?,

        @RequestParam(
            required = false
        )
        flavor: String?,

        @RequestParam
        active: Boolean,

        @RequestParam
        productId: Long,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<ProductVariant> {

        val request =

            CreateProductVariantRequest(

                variantName =
                    variantName,

                sku =
                    sku,

                price =
                    price.toBigDecimal(),

                oldPrice =
                    oldPrice?.toBigDecimal(),

                discountPercent =
                    discountPercent
                        ?.toBigDecimal(),

                stock =
                    stock,

                size =
                    size,

                color =
                    color,

                weight =
                    weight,

                flavor =
                    flavor,

                active =
                    active,

                productId =
                    productId
            )

        val response =

            productVariantService
                .createVariant(

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Variant created successfully",

            data = response
        )
    }

    // GET BY PRODUCT
    @GetMapping(
        "/product/{productId}"
    )
    fun getVariantsByProduct(

        @PathVariable
        productId: Long

    ): ResponseDto<
            List<ProductVariant>
            > {

        val response =

            productVariantService
                .getVariantsByProduct(
                    productId
                )

        return ResponseDto(

            status = true,

            message =
                "Variants fetched successfully",

            data = response
        )
    }

    // GET BY ID
    @GetMapping("/{variantId}")
    fun getVariantById(

        @PathVariable
        variantId: Long

    ): ResponseDto<ProductVariant> {

        val response =

            productVariantService
                .getVariantById(
                    variantId
                )

        return ResponseDto(

            status = true,

            message =
                "Variant fetched successfully",

            data = response
        )
    }

    // UPDATE
    @PutMapping(

        value = ["/{variantId}"],

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun updateVariant(

        @PathVariable
        variantId: Long,

        @RequestParam
        variantName: String,

        @RequestParam(
            required = false
        )
        sku: String?,

        @RequestParam
        price: String,

        @RequestParam(
            required = false
        )
        oldPrice: String?,

        @RequestParam(
            required = false
        )
        discountPercent: String?,

        @RequestParam(
            required = false
        )
        stock: Int?,

        @RequestParam(
            required = false
        )
        size: String?,

        @RequestParam(
            required = false
        )
        color: String?,

        @RequestParam(
            required = false
        )
        weight: String?,

        @RequestParam(
            required = false
        )
        flavor: String?,

        @RequestParam
        active: Boolean,

        @RequestParam
        productId: Long,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<ProductVariant> {

        val request =

            CreateProductVariantRequest(

                variantName =
                    variantName,

                sku =
                    sku,

                price =
                    price.toBigDecimal(),

                oldPrice =
                    oldPrice?.toBigDecimal(),

                discountPercent =
                    discountPercent
                        ?.toBigDecimal(),

                stock =
                    stock,

                size =
                    size,

                color =
                    color,

                weight =
                    weight,

                flavor =
                    flavor,

                active =
                    active,

                productId =
                    productId
            )

        val response =

            productVariantService
                .updateVariant(

                    variantId,

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Variant updated successfully",

            data = response
        )
    }

    // DELETE
    @DeleteMapping("/{variantId}")
    fun deleteVariant(

        @PathVariable
        variantId: Long

    ): ResponseDto<Nothing> {

        productVariantService
            .deleteVariant(
                variantId
            )

        return ResponseDto(

            status = true,

            message =
                "Variant deleted successfully",

            data = null
        )
    }

    // TOGGLE STATUS
    @PatchMapping(
        "/toggle-status/{variantId}"
    )
    fun toggleVariantStatus(

        @PathVariable
        variantId: Long

    ): ResponseDto<ProductVariant> {

        val response =

            productVariantService
                .toggleVariantStatus(
                    variantId
                )

        return ResponseDto(

            status = true,

            message =
                "Variant status updated",

            data = response
        )
    }

}