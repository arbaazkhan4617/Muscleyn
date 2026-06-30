package com.muscleyn.backend.util


import com.muscleyn.backend.entity.Product
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.response.ProductResponse
import com.muscleyn.backend.response.ProductVariantResponse
import com.muscleyn.backend.response.ProductImageResponse

fun ProductVariant.toResponse():
        ProductVariantResponse {

    return ProductVariantResponse(

        id = id,

        variantName = variantName,

        sku = sku,

        imageUrl = imageUrl,

        price = price,

        oldPrice = oldPrice,

        discountPercent =
            discountPercent,

        stock = stock,

        size = size,

        color = color,

        weight = weight,

        flavor = flavor,

        isActive=isActive,
        amazonUrl = amazonUrl,
        flipkartUrl = flipkartUrl
    )
}

fun Product.toResponse():
        ProductResponse {

    return ProductResponse(

        id = id,

        name = name,

        description = description,

        imageUrl = imageUrl,
        categoryId = subCategory
            ?.category
            ?.id,
        categoryName =
            subCategory
                ?.category
                ?.name,
        subCategoryId = subCategory
            ?.id,
        subCategoryName =
            subCategory
                ?.name,
        brandId =
            brand
                ?.id,
        brandName =
            brand
                ?.name,

        variants =
            variants.map {

                it.toResponse()
            },
        isActive = isActive,
        productImages = productImages.map { ProductImageResponse(it.id, it.imageUrl, it.sequenceNumber) },
        nutrition = nutrition,
        benefits = benefits,
        isBestSeller = isBestSeller,
        isOffer = isOffer,
        createdAt = createdAt,
        updatedAt = updatedAt,
        productReportUrl = productReportUrl,
        reportProteinPercentage = reportProteinPercentage,
        reportHeavyMetal = reportHeavyMetal,
        reportAminoAcidProfile = reportAminoAcidProfile,
        reportMicrobialSafety = reportMicrobialSafety,
        reportTestDetails = reportTestDetails,
        showManufactureDetails = showManufactureDetails
    )
}