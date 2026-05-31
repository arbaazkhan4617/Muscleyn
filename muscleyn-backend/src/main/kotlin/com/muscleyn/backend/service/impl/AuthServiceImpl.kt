package com.muscleyn.backend.service.impl

import com.muscleyn.backend.dto.*
import com.muscleyn.backend.entity.User
import com.muscleyn.backend.repository.UserRepository
import com.muscleyn.backend.security.JwtUtil
import com.muscleyn.backend.service.AuthService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import com.fasterxml.jackson.databind.ObjectMapper
import java.net.URL

@Service
class AuthServiceImpl(

    private val userRepository:
    UserRepository,

    private val jwtUtil:
    JwtUtil

) : AuthService {

    private val passwordEncoder =
        BCryptPasswordEncoder()

    override fun register(
        request: RegisterRequest
    ): AuthResponse {

        if (
            userRepository.existsByMobileNumber(
                request.mobileNumber
            )
        ) {

            throw RuntimeException(
                "Mobile number already registered"
            )
        }

        val user = User(

            name = request.name,

            mobileNumber =
                request.mobileNumber,

            password =

                request.password
                    ?.let {

                        passwordEncoder.encode(
                            it
                        )
                    }
        )

        val savedUser =
            userRepository.save(user)

        val token =
            jwtUtil.generateToken(
                savedUser.mobileNumber!!
            )

        return AuthResponse(

            token = token,

            userId = savedUser.id,

            name = savedUser.name,

            mobileNumber =
                savedUser.mobileNumber
        )
    }

    override fun login(
        request: LoginRequest
    ): AuthResponse {

        val user =

            userRepository
                .findByMobileNumber(
                    request.mobileNumber
                )

                ?: throw RuntimeException(
                    "Invalid mobile number"
                )

        val passwordMatches =

            passwordEncoder.matches(

                request.password,

                user.password
            )

        if (!passwordMatches) {

            throw RuntimeException(
                "Invalid password"
            )
        }

        val token =
            jwtUtil.generateToken(
                user.mobileNumber!!
            )

        return AuthResponse(

            token = token,

            userId = user.id,

            name = user.name,

            mobileNumber =
                user.mobileNumber
        )
    }

    override fun googleLogin(
        request: GoogleAuthRequest
    ): AuthResponse {

        // Verify the Google id_token with Google's public endpoint
        val googleTokenInfoUrl =
            "https://oauth2.googleapis.com/tokeninfo?id_token=${request.idToken}"

        val responseText = try {
            URL(googleTokenInfoUrl).readText()
        } catch (e: Exception) {
            throw RuntimeException("Failed to verify Google token")
        }

        val mapper = ObjectMapper()
        val tokenInfo = mapper.readTree(responseText)

        // Check for error from Google
        if (tokenInfo.has("error")) {
            throw RuntimeException("Invalid Google token: ${tokenInfo.get("error_description")?.asText() ?: "unknown"}")
        }

        val email = tokenInfo.get("email")?.asText()
            ?: throw RuntimeException("Google account has no email")

        val name = tokenInfo.get("name")?.asText() ?: email.substringBefore("@")
        val googleSub = tokenInfo.get("sub")?.asText() ?: email

        // Find existing user by email, or by mobile matching google sub, or create new
        var user = userRepository.findByEmailOrMobileNumber(email, "google_$googleSub")

        if (user == null) {
            // Auto-register the Google user
            user = User(
                name = name,
                email = email,
                mobileNumber = "google_$googleSub",   // synthetic unique mobile
                password = null                         // no password for OAuth users
            )
            user = userRepository.save(user)
        }

        // Use email as JWT subject for Google users (since no mobile)
        val jwtSubject = user.mobileNumber ?: email
        val token = jwtUtil.generateToken(jwtSubject)

        return AuthResponse(
            token = token,
            userId = user.id,
            name = user.name,
            mobileNumber = user.mobileNumber
        )
    }
}
