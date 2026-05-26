package com.muscleyn.backend.service

import com.muscleyn.backend.dto.BrandRequest
import com.muscleyn.backend.dto.CreateBrandRequest
import com.muscleyn.backend.entity.Brand
import org.springframework.web.multipart.MultipartFile

interface BrandService {

    fun createBrand(
        request: BrandRequest
    ): Brand


    fun createBrand(

        request:
        CreateBrandRequest,

        image:
        MultipartFile?

    ): Brand

    fun getAllBrands():
            List<Brand>

    fun getBrandById(
        brandId: Long
    ): Brand

    fun updateBrand(

        brandId: Long,

        request:
        CreateBrandRequest,

        image:
        MultipartFile?

    ): Brand

    fun deleteBrand(
        brandId: Long
    )

    fun toggleBrandStatus(
        brandId: Long
    ): Brand
}