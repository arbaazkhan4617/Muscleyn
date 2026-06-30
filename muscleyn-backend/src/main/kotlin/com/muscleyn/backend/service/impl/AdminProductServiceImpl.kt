package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.ProductListDto
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.service.AdminProductService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class AdminProductServiceImpl(

    private val productRepository:
    ProductRepository

) : AdminProductService {

    override fun getAllProducts(
        search: String?,
        page: Int,

        size: Int


    ): Page<ProductListDto>{

        val pageable =

            PageRequest.of(

                page,

                size,

                        Sort.by(
                        Sort.Direction.DESC,

                "id"
            )
            )


        val productPage =

            if (
                search.isNullOrBlank()
            ) {

                productRepository
                    .findAll(pageable)

            } else {

                productRepository
                    .findByNameContainingIgnoreCase(

                        search,

                        pageable
                    )
            }
        return productPage
            .map { product ->
                ProductListDto(

                    id =
                        product.id,

                    name =
                        product.name,

                    imageUrl =
                        product.imageUrl,

                    brandName =
                        product.brand
                            ?.name,

                    categoryName =
                        product.subCategory
                            ?.category
                            ?.name,

                    subCategoryName =
                        product.subCategory
                            ?.name,

                    active =
                        product.isActive,

                    isBestSeller =
                        product.isBestSeller,

                    isOffer =
                        product.isOffer,

                    productReportUrl =
                        product.productReportUrl,

                    reportProteinPercentage =
                        product.reportProteinPercentage,

                    reportHeavyMetal =
                        product.reportHeavyMetal,

                    reportAminoAcidProfile =
                        product.reportAminoAcidProfile,

                    reportMicrobialSafety =
                        product.reportMicrobialSafety,

                    reportTestDetails =
                        product.reportTestDetails,
                    
                    showManufactureDetails =
                        product.showManufactureDetails
                )
            }
    }
}