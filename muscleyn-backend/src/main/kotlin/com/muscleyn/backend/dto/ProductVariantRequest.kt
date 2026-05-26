package com.muscleyn.backend.dto

import jakarta.validation.constraints.*
import java.math.BigDecimal

data class ProductVariantRequest(

    @field:NotBlank(
        message =
            "Variant name is required"
    )
    val variantName: String,

    val sku: String?,

    val imageUrl: String?,

    @field:NotNull(
        message = "Price is required"
    )
    @field:DecimalMin(
        value = "1.0",
        message =
            "Price must be greater than 0"
    )
    val price: BigDecimal,

    val oldPrice: BigDecimal?,

    val discountPercent: BigDecimal?,

    val size: String?,

    val color: String?,

    val weight: String?,

    val flavor: String?,

    @field:NotNull(
        message = "Stock is required"
    )
    @field:Min(
        value = 0,
        message =
            "Stock cannot be negative"
    )
    val stock: Int?,

    @field:NotNull(
        message =
            "Product id is required"
    )
    val productId: Long?,
)