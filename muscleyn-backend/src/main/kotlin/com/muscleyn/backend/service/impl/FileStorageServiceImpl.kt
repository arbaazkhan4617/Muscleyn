package com.muscleyn.backend.service.impl

import com.muscleyn.backend.service.FileStorageService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@Service
class FileStorageServiceImpl(

    @Value("\${file.upload-dir}")
    private val uploadDir: String

) : FileStorageService {

    override fun uploadProductImage(
        file: MultipartFile
    ): String {

        val uploadPath: Path =
            Paths.get(uploadDir)

        if (
            !Files.exists(uploadPath)
        ) {

            Files.createDirectories(
                uploadPath
            )
        }

        val fileName =
            UUID.randomUUID()
                .toString() +

                    "_" +

                    file.originalFilename

        val filePath =
            uploadPath.resolve(
                fileName
            )

        Files.copy(

            file.inputStream,

            filePath,

            StandardCopyOption
                .REPLACE_EXISTING
        )

        return "/uploads/products/$fileName"
    }
}