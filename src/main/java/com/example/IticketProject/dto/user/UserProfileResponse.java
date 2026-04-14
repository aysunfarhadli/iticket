package com.example.IticketProject.dto.user;

import java.util.Set;

public record UserProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phone,
        Set<String> roles
) {}
