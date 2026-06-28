package com.muscleyn.backend.dto

data class ProductListDto(

    val id:
        Long?,

    val name:
        String?,

    val imageUrl:
        String?,

    val brandName:
        String?,

    val categoryName:
        String?,

    val subCategoryName:
        String?,

    val active:
        Boolean?,

    val isBestSeller: Boolean?,

    val isOffer: Boolean?,

    val productReportUrl: String?,

    val reportProteinPercentage: String?,
    val reportHeavyMetal: String?,
    val reportAminoAcidProfile: String?,
    val reportMicrobialSafety: String?,
    val reportTestDetails: String?,
    val amazonUrl: String?,
    val flipkartUrl: String?
)