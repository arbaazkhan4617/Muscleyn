package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.Cms
import org.springframework.data.jpa.repository.JpaRepository

interface CmsRepository :
    JpaRepository<Cms, Long> {

    fun findByCmsKey(
        cmsKey: String
    ): Cms?
}