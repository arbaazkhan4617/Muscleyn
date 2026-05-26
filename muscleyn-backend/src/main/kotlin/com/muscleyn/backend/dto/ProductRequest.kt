package com.muscleyn.backend.dto


import jakarta.validation.constraints.*
import java.math.BigDecimal

data class ProductRequest(

    @field:NotBlank(
        message = "Product name is required"
    )
    val name: String,

    @field:NotBlank(
        message =
            "Description is required"
    )
    val description: String?,

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

    val discountPercent: Int?,

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
            "Sub category id is required"
    )
    val subCategoryId: Long?,

    @field:NotNull(
        message =
            "Brand is required"
    )
    val brandId: Long?,

    val imageUrl: String?,
)