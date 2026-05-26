package com.muscleyn.backend.controller

import com.muscleyn.backend.dto.ImageUploadResponse
import com.muscleyn.backend.dto.ResponseDto
import com.muscleyn.backend.service.FileStorageService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/files")
class FileUploadController(

    private val fileStorageService:
    FileStorageService

) {

    @PostMapping(
        "/upload-product-image"
    )
    fun uploadProductImage(

        @RequestParam("file")
        file: MultipartFile

    ): ResponseDto<ImageUploadResponse> {

        val imageUrl =
            fileStorageService
                .uploadProductImage(
                    file
                )

        return ResponseDto(

            status = true,

            message =
                "Image uploaded successfully",

            data =
                ImageUploadResponse(
                    imageUrl
                )
        )
    }
}