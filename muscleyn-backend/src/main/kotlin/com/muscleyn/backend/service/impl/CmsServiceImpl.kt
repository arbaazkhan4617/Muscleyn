package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.CmsRequest
import com.muscleyn.backend.entity.Cms
import com.muscleyn.backend.repository.CmsRepository
import com.muscleyn.backend.service.CmsService
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class CmsServiceImpl(

    private val cmsRepository:
    CmsRepository

) : CmsService {

    override fun saveCms(
        request: CmsRequest
    ): Cms {

        val existingCms =

            cmsRepository
                .findByCmsKey(
                    request.cmsKey
                )

        if (
            existingCms != null
        ) {

            existingCms.cmsValue =
                request.cmsValue

            existingCms.updatedAt =
                LocalDateTime.now()

            return cmsRepository
                .save(existingCms)
        }

        val cms = Cms(

            cmsKey =
                request.cmsKey,

            cmsValue =
                request.cmsValue
        )

        return cmsRepository
            .save(cms)
    }

    override fun getCmsByKey(
        cmsKey: String
    ): Cms {

        return cmsRepository
            .findByCmsKey(cmsKey)

            ?: throw RuntimeException(
                "Cms not found"
            )
    }

    override fun getAllCms():
            List<Cms> {

        return cmsRepository
            .findAll()
    }
}