package com.muscleyn.backend.dto

data class CreateProductRequest(

    val name:
    String,

    val description:
    String?,

    val brandId:
    Long,

    val subCategoryId:
    Long?,

    val active:
    Boolean,

    val nutrition: String? = null,

    val benefits: String? = null,

    val isBestSeller: Boolean? = false,

    val isOffer: Boolean? = false,

    val productReportUrl: String? = null,

    val amazonUrl: String? = null,

    val flipkartUrl: String? = null
)