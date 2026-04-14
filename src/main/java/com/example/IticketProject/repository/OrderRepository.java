package com.example.IticketProject.repository;

import com.example.IticketProject.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    Page<Order> findAllByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
}
