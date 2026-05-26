package com.muscleyn.backend.service

import com.muscleyn.backend.dto.BannerRequest
import com.muscleyn.backend.entity.Banner

interface BannerService {

    fun createBanner(
        request: BannerRequest
    ): Banner

    fun updateBanner(

        bannerId: Long,

        request: BannerRequest

    ): Banner

    fun getAllBanners():
            List<Banner>

    fun getActiveBanners():
            List<Banner>

    fun deleteBanner(
        bannerId: Long
    )
}