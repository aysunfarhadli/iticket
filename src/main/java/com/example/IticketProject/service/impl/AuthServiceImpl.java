package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.auth.*;
import com.example.IticketProject.entity.Role;
import com.example.IticketProject.entity.User;
import com.example.IticketProject.enums.RoleType;
import com.example.IticketProject.exception.BadRequestException;
import com.example.IticketProject.mapper.UserMapper;
import com.example.IticketProject.repository.RoleRepository;
import com.example.IticketProject.repository.UserRepository;
import com.example.IticketProject.security.JwtService;
import com.example.IticketProject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final AuthenticationManager authManager;
    private final UserMapper mapper;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (users.existsByEmailIgnoreCase(req.email()))
            throw new BadRequestException("Email already registered");
        Role userRole = roles.findByName(RoleType.USER)
                .orElseGet(() -> roles.save(Role.builder().name(RoleType.USER).build()));
        Set<Role> rs = new HashSet<>();
        rs.add(userRole);
        User u = User.builder()
                .firstName(req.firstName()).lastName(req.lastName())
                .email(req.email().toLowerCase()).passwordHash(encoder.encode(req.password()))
                .phone(req.phone()).enabled(true).roles(rs).build();
        users.save(u);
        return token(u);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        User u = users.findByEmailIgnoreCase(req.email()).orElseThrow();
        return token(u);
    }

    private AuthResponse token(User u) {
        String t = jwt.generate(u.getEmail(), Map.of("uid", u.getId(),
                "roles", u.getRoles().stream().map(r -> r.getName().name()).toList()));
        return new AuthResponse(t, "Bearer", jwt.ttlSeconds(), mapper.toProfile(u));
    }
}
