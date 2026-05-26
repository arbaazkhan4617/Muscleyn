package com.muscleyn.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "sub_category")
class SubCategory(

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    var id: Long? = null,

    @Column(nullable = false)
    var name: String? = null,

    @Column(unique = true)
    var slug: String? = null,

    var imageUrl: String? = null,

    var isActive: Boolean? = true,

    @ManyToOne
    @JoinColumn(name = "category_id")

    @JsonIgnoreProperties(
        value = ["hibernateLazyInitializer"]
    )
    var category: Category? = null,

    var createdAt:
    LocalDateTime? =
        LocalDateTime.now(),

    var updatedAt:
    LocalDateTime? =
        LocalDateTime.now(),
)