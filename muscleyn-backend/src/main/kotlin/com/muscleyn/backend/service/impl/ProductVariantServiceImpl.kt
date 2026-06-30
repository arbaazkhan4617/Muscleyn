package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CreateProductVariantRequest
import com.muscleyn.backend.dto.ProductVariantRequest
import com.muscleyn.backend.entity.ProductVariant
import com.muscleyn.backend.repository.ProductRepository
import com.muscleyn.backend.repository.ProductVariantRepository
import com.muscleyn.backend.service.ProductVariantService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File

@Service
class ProductVariantServiceImpl(

    private val productRepository:
    ProductRepository,

    private val productVariantRepository:
    ProductVariantRepository

) : ProductVariantService {

    @Value("\${file.upload-dir}")
    private lateinit var uploadDirPath: String

    override fun createVariant(
        request: ProductVariantRequest
    ): ProductVariant {

        val product =

            productRepository
                .findById(
                    request.productId!!
                )

                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        val variant =
            ProductVariant(

                variantName =
                    request.variantName,

                sku = request.sku,

                imageUrl =
                    request.imageUrl,

                price = request.price,

                oldPrice =
                    request.oldPrice,

                discountPercent =
                    request.discountPercent,

                size = request.size,

                color = request.color,

                weight = request.weight,

                flavor = request.flavor,

                stock = request.stock,

                product = product
            )

        return productVariantRepository
            .save(variant)
    }

    override fun getVariantsByProduct(
        productId: Long
    ): List<ProductVariant> {

        println("Prod Id :"+productId)
        return productVariantRepository
            .findByProductId(
                productId
            )
    }

     fun getVariantById1(
        variantId: Long
    ): ProductVariant {

        return productVariantRepository
            .findById(variantId)

            .orElseThrow {

                RuntimeException(
                    "Variant not found"
                )
            }
    }

    override fun updateVariant(

        variantId: Long,

        request: ProductVariantRequest

    ): ProductVariant {

        val variant =

            productVariantRepository
                .findById(variantId)

                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        val product =

            productRepository
                .findById(
                    request.productId!!
                )

                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        variant.variantName =
            request.variantName

        variant.sku =
            request.sku

        variant.imageUrl =
            request.imageUrl

        variant.price =
            request.price

        variant.oldPrice =
            request.oldPrice

        variant.discountPercent =
            request.discountPercent

        variant.stock =
            request.stock

        variant.size =
            request.size

        variant.color =
            request.color

        variant.weight =
            request.weight

        variant.flavor =
            request.flavor

        variant.product =
            product

        return productVariantRepository
            .save(variant)
    }

     fun deleteVariant1(
        variantId: Long
    ) {

        val variant =

            productVariantRepository
                .findById(variantId)

                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        variant.isActive = false

        productVariantRepository
            .save(variant)
    }





    override fun createVariant(

        request:
        CreateProductVariantRequest,

        image:
        MultipartFile?

    ): ProductVariant {

        val product =

            productRepository
                .findById(
                    request.productId
                )
                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        val variant =
            ProductVariant()

        variant.variantName =
            request.variantName

        variant.sku =
            request.sku

        variant.price =
            request.price

        variant.oldPrice =
            request.oldPrice

        variant.discountPercent =
            request.discountPercent

        variant.stock =
            request.stock

        variant.size =
            request.size

        variant.color =
            request.color

        variant.weight =
            request.weight

        variant.flavor =
            request.flavor

        variant.isActive =
            request.active

        variant.amazonUrl = request.amazonUrl
        variant.flipkartUrl = request.flipkartUrl

        variant.product =
            product

        // IMAGE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadDir =
                File(  uploadDirPath).absoluteFile

            if (!uploadDir.exists()) {

                uploadDir.mkdirs()
            }

            val filePath =

                File(
                    uploadDir,
                    fileName
                )

            image.transferTo(
                filePath
            )

            variant.imageUrl =
                "/uploads/products/$fileName"
        }

        return productVariantRepository
            .save(variant)
    }



    override fun getVariantById(

        variantId: Long

    ): ProductVariant {

        return productVariantRepository
            .findById(
                variantId
            )
            .orElseThrow {

                RuntimeException(
                    "Variant not found"
                )
            }
    }

    override fun updateVariant(

        variantId: Long,

        request:
        CreateProductVariantRequest,

        image:
        MultipartFile?

    ): ProductVariant {

        val variant =

            productVariantRepository
                .findById(
                    variantId
                )
                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        val product =

            productRepository
                .findById(
                    request.productId
                )
                .orElseThrow {

                    RuntimeException(
                        "Product not found"
                    )
                }

        variant.variantName =
            request.variantName

        variant.sku =
            request.sku

        variant.price =
            request.price

        variant.oldPrice =
            request.oldPrice

        variant.discountPercent =
            request.discountPercent

        variant.stock =
            request.stock

        variant.size =
            request.size

        variant.color =
            request.color

        variant.weight =
            request.weight

        variant.flavor =
            request.flavor

        variant.isActive =
            request.active

        variant.amazonUrl = request.amazonUrl
        variant.flipkartUrl = request.flipkartUrl

        variant.product =
            product

        // IMAGE UPDATE
        if (image != null) {

            val fileName =

                System.currentTimeMillis()
                    .toString() +

                        "_" +

                        image.originalFilename

            val uploadDir =
                File(  uploadDirPath).absoluteFile

            if (!uploadDir.exists()) {

                uploadDir.mkdirs()
            }

            val filePath =

                File(
                    uploadDir,
                    fileName
                )

            image.transferTo(
                filePath
            )

            variant.imageUrl =
                "/uploads/products/$fileName"
        }

        return productVariantRepository
            .save(variant)
    }

    override fun deleteVariant(

        variantId: Long

    ) {

        val variant =

            productVariantRepository
                .findById(
                    variantId
                )
                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        productVariantRepository
            .delete(variant)
    }

    override fun toggleVariantStatus(

        variantId: Long

    ): ProductVariant {

        val variant =

            productVariantRepository
                .findById(
                    variantId
                )
                .orElseThrow {

                    RuntimeException(
                        "Variant not found"
                    )
                }

        variant.isActive =
            !(variant.isActive ?: true)

        return productVariantRepository
            .save(variant)
    }
}