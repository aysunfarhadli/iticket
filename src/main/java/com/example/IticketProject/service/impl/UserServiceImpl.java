package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.user.UpdateProfileRequest;
import com.example.IticketProject.dto.user.UserProfileResponse;
import com.example.IticketProject.entity.User;
import com.example.IticketProject.mapper.UserMapper;
import com.example.IticketProject.repository.UserRepository;
import com.example.IticketProject.security.CurrentUser;
import com.example.IticketProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository users;
    private final UserMapper mapper;
    private final CurrentUser currentUser;

    public UserProfileResponse me() { return mapper.toProfile(currentUser.get()); }

    @Transactional
    public UserProfileResponse updateMe(UpdateProfileRequest req) {
        User u = currentUser.get();
        u.setFirstName(req.firstName()); u.setLastName(req.lastName()); u.setPhone(req.phone());
        return mapper.toProfile(users.save(u));
    }

    public List<UserProfileResponse> adminListAll() {
        return users.findAll().stream().map(mapper::toProfile).toList();
    }
}
