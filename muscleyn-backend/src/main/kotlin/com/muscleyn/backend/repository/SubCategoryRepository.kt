package com.muscleyn.backend.repository

import com.muscleyn.backend.entity.SubCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional
import org.springframework.data.repository.query.Param

interface SubCategoryRepository :
    JpaRepository<SubCategory, Long>
{
    @Modifying
    @Transactional
    @Query("UPDATE SubCategory s SET s.category = null WHERE s.category.id = :categoryId")
    fun dissociateCategory(@Param("categoryId") categoryId: Long)
}