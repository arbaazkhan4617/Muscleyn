package com.muscleyn.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

@SpringBootApplication
class MuscleynBackendApplication : SpringBootServletInitializer() {
	override fun configure(application: SpringApplicationBuilder): SpringApplicationBuilder {
		return application.sources(MuscleynBackendApplication::class.java)
	}
}

fun main(args: Array<String>) {
	runApplication<MuscleynBackendApplication>(*args)
}
