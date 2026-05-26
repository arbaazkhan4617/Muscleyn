package com.muscleyn.backend.service

import com.muscleyn.backend.dto.CmsRequest
import com.muscleyn.backend.entity.Cms

interface CmsService {

    fun saveCms(
        request: CmsRequest
    ): Cms

    fun getCmsByKey(
        cmsKey: String
    ): Cms

    fun getAllCms():
            List<Cms>
}