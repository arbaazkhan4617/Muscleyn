package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Banner
import org.springframework.data.jpa.repository.JpaRepository

interface BannerRepository :
    JpaRepository<Banner, Long> {

    fun findByIsActiveTrueOrderBySortOrderAsc():
            List<Banner>
}