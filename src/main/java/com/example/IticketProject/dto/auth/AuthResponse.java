package com.example.IticketProject.dto.auth;

import com.example.IticketProject.dto.user.UserProfileResponse;

public record AuthResponse(String accessToken, String tokenType, long expiresIn, UserProfileResponse user) {}
