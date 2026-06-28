package com.muscleyn.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

import org.springframework.context.annotation.Bean
import jakarta.servlet.MultipartConfigElement

@SpringBootApplication
class MuscleynBackendApplication : SpringBootServletInitializer() {
	override fun configure(application: SpringApplicationBuilder): SpringApplicationBuilder {
		return application.sources(MuscleynBackendApplication::class.java)
	}

	@Bean
	fun multipartConfigElement(): MultipartConfigElement {
		// 50MB max file size and max request size
		return MultipartConfigElement("", 52428800L, 52428800L, 0)
	}
}

fun main(args: Array<String>) {
	runApplication<MuscleynBackendApplication>(*args)
}
