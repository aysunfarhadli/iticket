package com.example.IticketProject.service;

import com.example.IticketProject.dto.user.UpdateProfileRequest;
import com.example.IticketProject.dto.user.UserProfileResponse;

import java.util.List;

public interface UserService {
    UserProfileResponse me();
    UserProfileResponse updateMe(UpdateProfileRequest req);
    List<UserProfileResponse> adminListAll();
}
