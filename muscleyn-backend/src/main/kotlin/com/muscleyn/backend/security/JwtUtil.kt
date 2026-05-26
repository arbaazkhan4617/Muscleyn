package com.muscleyn.backend.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtil(

    @Value("\${jwt.secret}")
    private val secret: String,

    @Value("\${jwt.expiration}")
    private val expiration: Long

) {

    private fun getSigningKey():
            SecretKey {

        return Keys.hmacShaKeyFor(
            secret.toByteArray()
        )
    }

    fun generateToken(
        mobileNumber: String
    ): String {

        return Jwts.builder()

            .subject(mobileNumber)

            .issuedAt(Date())

            .expiration(
                Date(
                    System.currentTimeMillis()
                            + expiration
                )
            )

            .signWith(
                getSigningKey(),

                Jwts.SIG.HS256
            )

            .compact()
    }

    fun extractMobileNumber(
        token: String
    ): String {

        return extractClaims(token)
            .subject
    }

    fun validateToken(
        token: String,

        mobileNumber: String

    ): Boolean {

        return extractMobileNumber(
            token
        ) == mobileNumber

                &&

                !isTokenExpired(token)
    }

    private fun isTokenExpired(
        token: String
    ): Boolean {

        return extractClaims(token)

            .expiration

            .before(Date())
    }

    private fun extractClaims(
        token: String
    ): Claims {

        return Jwts.parser()

            .verifyWith(
                getSigningKey()
            )

            .build()

            .parseSignedClaims(token)

            .payload
    }
}