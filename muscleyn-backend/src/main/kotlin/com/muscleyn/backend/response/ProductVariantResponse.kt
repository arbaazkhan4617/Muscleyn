package com.muscleyn.backend.response

import java.math.BigDecimal

data class ProductVariantResponse(

    val id: Long?,

    val variantName: String?,

    val sku: String?,

    val imageUrl: String?,

    val price: BigDecimal?,

    val oldPrice: BigDecimal?,

    val discountPercent: BigDecimal?,

    val stock: Int?,

    val size: String?,

    val color: String?,

    val weight: String?,

    val flavor: String?,
    val isActive: Boolean?
)