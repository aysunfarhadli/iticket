package com.example.IticketProject.mapper;

import com.example.IticketProject.dto.user.UserProfileResponse;
import com.example.IticketProject.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserProfileResponse toProfile(User u) {
        return new UserProfileResponse(
                u.getId(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getPhone(),
                u.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet()));
    }
}
