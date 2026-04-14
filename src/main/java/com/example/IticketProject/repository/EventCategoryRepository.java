package com.example.IticketProject.repository;

import com.example.IticketProject.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventCategoryRepository extends JpaRepository<EventCategory, Long> {
    Optional<EventCategory> findBySlugIgnoreCase(String slug);
}
