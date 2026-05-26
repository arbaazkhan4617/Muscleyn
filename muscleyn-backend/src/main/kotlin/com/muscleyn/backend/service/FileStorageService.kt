package com.muscleyn.backend.service

import org.springframework.web.multipart.MultipartFile

interface FileStorageService {

    fun uploadProductImage(
        file: MultipartFile
    ): String
}