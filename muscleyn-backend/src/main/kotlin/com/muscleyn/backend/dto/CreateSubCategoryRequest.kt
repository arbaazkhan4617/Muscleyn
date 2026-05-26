package com.muscleyn.backend.dto

data class CreateSubCategoryRequest(

    val name:
        String,

    val active:
        Boolean,

    val categoryId:
        Long
)