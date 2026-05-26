package com.muscleyn.backend.dto

import java.math.BigDecimal

data class CreateProductVariantRequest(

    val variantName:
        String,

    val sku:
        String?,

    val price:
        BigDecimal,

    val oldPrice:
        BigDecimal?,

    val discountPercent:
        BigDecimal?,

    val stock:
        Int?,

    val size:
        String?,

    val color:
        String?,

    val weight:
        String?,

    val flavor:
        String?,

    val active:
        Boolean,

    val productId:
        Long
)