package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.BannerRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Banner
import com.muscleyn.backend.service.BannerService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/banners")
class BannerController(

    private val bannerService:
    BannerService

) {

    @PostMapping
    fun createBanner(

        @Valid
        @RequestBody
        request: BannerRequest

    ): ResponseDto<Banner> {

        val banner =
            bannerService
                .createBanner(request)

        return ResponseDto(

            status = true,

            message =
                "Banner created successfully",

            data = banner
        )
    }

    @PutMapping("/{bannerId}")
    fun updateBanner(

        @PathVariable
        bannerId: Long,

        @Valid
        @RequestBody
        request: BannerRequest

    ): ResponseDto<Banner> {

        val banner =
            bannerService
                .updateBanner(

                    bannerId,

                    request
                )

        return ResponseDto(

            status = true,

            message =
                "Banner updated successfully",

            data = banner
        )
    }

    @GetMapping
    fun getAllBanners():
            ResponseDto<List<Banner>> {

        val banners =
            bannerService
                .getAllBanners()

        return ResponseDto(

            status = true,

            message =
                "Banner list fetched successfully",

            data = banners
        )
    }

    @GetMapping("/active")
    fun getActiveBanners():
            ResponseDto<List<Banner>> {

        val banners =
            bannerService
                .getActiveBanners()

        return ResponseDto(

            status = true,

            message =
                "Active banners fetched successfully",

            data = banners
        )
    }

    @DeleteMapping("/{bannerId}")
    fun deleteBanner(

        @PathVariable
        bannerId: Long

    ): ResponseDto<Nothing> {

        bannerService
            .deleteBanner(
                bannerId
            )

        return ResponseDto(

            status = true,

            message =
                "Banner deleted successfully",

            data = null
        )
    }
}