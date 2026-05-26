package com.muscleyn.backend.service

import com.muscleyn.backend.dto.ProductVariantRequest
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.dto.CreateProductVariantRequest
import org.springframework.web.multipart.MultipartFile
interface ProductVariantService {

    fun createVariant(
        request: ProductVariantRequest
    ): ProductVariant

    fun getVariantsByProduct(
        productId: Long
    ): List<ProductVariant>

    fun getVariantById(
        variantId: Long
    ): ProductVariant

    fun updateVariant(

        variantId: Long,

        request: ProductVariantRequest

    ): ProductVariant

    fun deleteVariant(
        variantId: Long
    )

    fun createVariant(

        request:
        CreateProductVariantRequest,

        image:
        MultipartFile?

    ): ProductVariant


  
    fun updateVariant(

        variantId: Long,

        request:
        CreateProductVariantRequest,

        image:
        MultipartFile?

    ): ProductVariant



    fun toggleVariantStatus(

        variantId: Long

    ): ProductVariant
}


