package com.muscleyn.backend.exception

import com.muscleyn.backend.dto.ResponseDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.bind.MethodArgumentNotValidException

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(
        RuntimeException::class
    )
    fun handleRuntimeException(
        ex: RuntimeException
    ): ResponseEntity<ResponseDto<Nothing>> {

        return ResponseEntity(

            ResponseDto(

                status = false,

                message =
                    ex.message
                        ?: "Something went wrong",

                data = null
            ),

            HttpStatus.BAD_REQUEST
        )
    }

    @ExceptionHandler(
        Exception::class
    )
    fun handleException(
        ex: Exception
    ): ResponseEntity<ResponseDto<Nothing>> {

        return ResponseEntity(

            ResponseDto(

                status = false,

                message =
                    ex.message
                        ?: "Internal server error",

                data = null
            ),

            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

    @ExceptionHandler(
        MethodArgumentNotValidException::class
    )
    fun handleValidationException(
        ex: MethodArgumentNotValidException
    ): ResponseEntity<ResponseDto<Nothing>> {

        val errorMessage =

            ex.bindingResult
                .fieldErrors

                .firstOrNull()

                ?.defaultMessage

                ?: "Validation failed"

        return ResponseEntity(

            ResponseDto(

                status = false,

                message = errorMessage,

                data = null
            ),

            HttpStatus.BAD_REQUEST
        )
    }
}