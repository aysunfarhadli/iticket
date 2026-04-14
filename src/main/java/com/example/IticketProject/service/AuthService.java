package com.example.IticketProject.service;

import com.example.IticketProject.dto.auth.*;

public interface AuthService {
    AuthResponse register(RegisterRequest req);
    AuthResponse login(LoginRequest req);
}
