package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.CmsRequest
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.entity.Cms
import com.muscleyn.backend.service.CmsService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cms")
class CmsController(

    private val cmsService:
    CmsService

) {

    @PostMapping
    fun saveCms(

        @Valid
        @RequestBody
        request: CmsRequest

    ): ResponseDto<Cms> {

        val cms =
            cmsService
                .saveCms(request)

        return ResponseDto(

            status = true,

            message =
                "Cms saved successfully",

            data = cms
        )
    }

    @GetMapping("/{cmsKey}")
    fun getCmsByKey(

        @PathVariable
        cmsKey: String

    ): ResponseDto<Cms?> {

        val cms =
            cmsService
                .getCmsByKey(
                    cmsKey
                )

        return ResponseDto(

            status = true,

            message =
                if (cms != null) "Cms fetched successfully" else "Cms key not found",

            data = cms
        )
    }

    @GetMapping
    fun getAllCms():
            ResponseDto<List<Cms>> {

        val cmsList =
            cmsService
                .getAllCms()

        return ResponseDto(

            status = true,

            message =
                "Cms list fetched successfully",

            data = cmsList
        )
    }
}