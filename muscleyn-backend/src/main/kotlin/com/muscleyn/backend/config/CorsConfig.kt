package com.muscleyn.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig(

    @Value("\${app.cors.allowed-origins:http://localhost:3000,http://localhost:3001}")
    private val allowedOrigins:
    String

) {

    @Bean
    fun corsFilter():
            CorsFilter {

        val config =
            CorsConfiguration()

        config.allowCredentials =
            true

        allowedOrigins
            .split(",")
            .map {
                it.trim()
            }
            .filter {
                it.isNotBlank()
            }
            .forEach {
                config.addAllowedOriginPattern(it)
            }

        config.addAllowedHeader("*")

        config.addAllowedMethod("*")

        val source =
            UrlBasedCorsConfigurationSource()

        source.registerCorsConfiguration(

            "/**",

            config
        )

        return CorsFilter(source)
    }
}