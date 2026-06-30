package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.BannerRequest
import com.muscleyn.backend.entity.Banner
import com.muscleyn.backend.repository.BannerRepository
import com.muscleyn.backend.service.BannerService
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class BannerServiceImpl(

    private val bannerRepository:
    BannerRepository

) : BannerService {

    override fun createBanner(
        request: BannerRequest
    ): Banner {

        val banner = Banner(

            title = request.title,

            eyebrow = request.eyebrow,

            subtitle = request.subtitle,

            imageUrl =
                request.imageUrl,

            boxImageUrl =
                request.boxImageUrl,

            redirectUrl =
                request.redirectUrl,

            sortOrder =
                request.sortOrder,

            isActive =
                request.isActive,

            showBoxText = request.showBoxText,

            boxTitle = request.boxTitle,

            boxSubtitle = request.boxSubtitle
        )

        return bannerRepository
            .save(banner)
    }

    override fun updateBanner(

        bannerId: Long,

        request: BannerRequest

    ): Banner {

        val banner =

            bannerRepository
                .findById(bannerId)

                .orElseThrow {

                    RuntimeException(
                        "Banner not found"
                    )
                }

        banner.title =
            request.title

        banner.eyebrow =
            request.eyebrow

        banner.subtitle =
            request.subtitle

        banner.imageUrl =
            request.imageUrl

        banner.boxImageUrl =
            request.boxImageUrl

        banner.redirectUrl =
            request.redirectUrl

        banner.sortOrder =
            request.sortOrder

        banner.isActive =
            request.isActive

        banner.showBoxText = request.showBoxText

        banner.boxTitle = request.boxTitle

        banner.boxSubtitle = request.boxSubtitle

        banner.updatedAt =
            LocalDateTime.now()

        return bannerRepository
            .save(banner)
    }

    override fun getAllBanners():
            List<Banner> {

        return bannerRepository
            .findAll()
    }

    override fun getActiveBanners():
            List<Banner> {

        return bannerRepository
            .findByIsActiveTrueOrderBySortOrderAsc()
    }

    override fun deleteBanner(
        bannerId: Long
    ) {

        val banner =

            bannerRepository
                .findById(bannerId)

                .orElseThrow {

                    RuntimeException(
                        "Banner not found"
                    )
                }

        bannerRepository
            .delete(banner)
    }
}