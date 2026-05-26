package com.muscleyn.backend.dto

import jakarta.validation.constraints.NotBlank

data class CmsRequest(

    @field:NotBlank(
        message =
            "Cms key is required"
    )
    val cmsKey: String,

    @field:NotBlank(
        message =
            "Cms value is required"
    )
    val cmsValue: String,
)