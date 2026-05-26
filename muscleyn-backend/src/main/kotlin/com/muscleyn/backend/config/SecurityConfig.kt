package com.muscleyn.backend.config

import com.muscleyn.backend.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class SecurityConfig(

    private val jwtAuthenticationFilter:
    JwtAuthenticationFilter

) {

    @Bean
    fun securityFilterChain(
        http: HttpSecurity
    ): SecurityFilterChain {

        http
            .cors{ }
            .csrf {

                it.disable()
            }

            .sessionManagement {

                it.sessionCreationPolicy(

                    SessionCreationPolicy
                        .STATELESS
                )
            }

            .authorizeHttpRequests {

                it

                    // PUBLIC APIs
                    .requestMatchers(

                        "/api/auth/**",
                        "/api/admin/**",

                        "/api/products/**",

                        "/api/categories/**",

                        "/api/brands/**",

                        "/api/sub-categories/**",

                        "/api/product-variants/**",

                        "/api/banners/active",

                        "/api/reviews/**",

                        "/api/orders/**",

                        "/api/payments/**",

                        "/uploads/**"

                    )

                    .permitAll()

                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/contact/enquiries"
                    )

                    .permitAll()

                    // ADMIN APIs
                    .requestMatchers(

                        "/api/dashboard/**",

                        "/api/cms/**",

                        "/api/coupons/**",

                        "/api/contact/enquiries"

                    )

                    .hasRole("ADMIN")

                    // authenticated user APIs
                    .anyRequest()

                    .authenticated()
            }

            .addFilterBefore(

                jwtAuthenticationFilter,

                UsernamePasswordAuthenticationFilter::class.java
            )

        return http.build()
    }

    @Bean
    fun passwordEncoder():
            PasswordEncoder {

        return BCryptPasswordEncoder()
    }
}