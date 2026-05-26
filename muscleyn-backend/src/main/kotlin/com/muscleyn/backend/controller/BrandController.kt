package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.BrandRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Brand
import com.muscleyn.backend.service.BrandService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

import com.muscleyn.backend.dto.CreateBrandRequest
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/brands")
class BrandController(

    private val brandService:
    BrandService

) {

    @PostMapping("/aa")
    fun createBrand(

        @Valid
        @RequestBody
        request: BrandRequest

    ): ResponseDto<Brand> {

        val brand =
            brandService
                .createBrand(
                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Brand created successfully",

            data = brand
        )
    }

    @GetMapping
    fun getAllBrands():
            ResponseDto<List<Brand>> {

        val brands =
            brandService
                .getAllBrands()

        return ResponseDto(

            status = true,

            message =
                "Brands fetched successfully",

            data = brands
        )
    }


    // CREATE
    @PostMapping(

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun createBrand(

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<Brand> {

        val request =

            CreateBrandRequest(

                name = name,

                active = active
            )

        val response =

            brandService
                .createBrand(

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Brand created successfully",

            data = response
        )
    }



    // GET BY ID
    @GetMapping("/{brandId}")
    fun getBrandById(

        @PathVariable
        brandId: Long

    ): ResponseDto<Brand> {

        val response =

            brandService
                .getBrandById(
                    brandId
                )

        return ResponseDto(

            status = true,

            message =
                "Brand fetched successfully",

            data = response
        )
    }

    // UPDATE
    @PutMapping(

        value = ["/{brandId}"],

        consumes = [
            MediaType.MULTIPART_FORM_DATA_VALUE
        ]
    )
    fun updateBrand(

        @PathVariable
        brandId: Long,

        @RequestParam
        name: String,

        @RequestParam
        active: Boolean,

        @RequestPart(
            required = false
        )
        image: MultipartFile?

    ): ResponseDto<Brand> {

        val request =

            CreateBrandRequest(

                name = name,

                active = active
            )

        val response =

            brandService
                .updateBrand(

                    brandId,

                    request,

                    image
                )

        return ResponseDto(

            status = true,

            message =
                "Brand updated successfully",

            data = response
        )
    }

    // DELETE
    @DeleteMapping("/{brandId}")
    fun deleteBrand(

        @PathVariable
        brandId: Long

    ): ResponseDto<Nothing> {

        brandService
            .deleteBrand(
                brandId
            )

        return ResponseDto(

            status = true,

            message =
                "Brand deleted successfully",

            data = null
        )
    }

    // TOGGLE STATUS
    @PatchMapping(
        "/toggle-status/{brandId}"
    )
    fun toggleBrandStatus(

        @PathVariable
        brandId: Long

    ): ResponseDto<Brand> {

        val response =

            brandService
                .toggleBrandStatus(
                    brandId
                )

        return ResponseDto(

            status = true,

            message =
                "Brand status updated",

            data = response
        )
    }
}