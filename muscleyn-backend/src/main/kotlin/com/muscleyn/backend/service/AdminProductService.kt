package com.muscleyn.backend.service

import com.muscleyn.backend.dto.ProductListDto
import org.springframework.data.domain.Page

interface AdminProductService {

    fun getAllProducts(
        search: String?,
        page: Int,

        size: Int


    ): Page<ProductListDto>
}