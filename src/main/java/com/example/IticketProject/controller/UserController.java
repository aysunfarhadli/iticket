package com.example.IticketProject.controller;

import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.dto.user.UpdateProfileRequest;
import com.example.IticketProject.dto.user.UserProfileResponse;
import com.example.IticketProject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService users;

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> me() { return ApiResponse.ok(users.me()); }

    @PutMapping("/me")
    public ApiResponse<UserProfileResponse> update(@Valid @RequestBody UpdateProfileRequest req) {
        return ApiResponse.ok(users.updateMe(req), "Profile updated");
    }
}
