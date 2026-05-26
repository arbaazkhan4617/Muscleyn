package com.muscleyn.backend.controller.admin

import com.muscleyn.backend.dto.ProductListDto
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.AdminProductService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin/products")
class AdminProductController(

    private val adminProductService:
    AdminProductService

) {

    @GetMapping
    fun getAllProducts(
        @RequestParam(
            required = false
        )
        search: String?,

        @RequestParam(
            defaultValue = "0"
        )
        page: Int,

        @RequestParam(
            defaultValue = "10"
        )
        size: Int

    ):
            ResponseDto<
                    Page<ProductListDto>
                    > {

        val response =

            adminProductService
                .getAllProducts(
                    search,
                    page,

                    size
                )

        return ResponseDto(

            status = true,

            message =
                "Products fetched successfully",

            data = response
        )
    }
}