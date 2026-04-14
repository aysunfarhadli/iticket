package com.example.IticketProject.repository;

import com.example.IticketProject.entity.Role;
import com.example.IticketProject.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}
