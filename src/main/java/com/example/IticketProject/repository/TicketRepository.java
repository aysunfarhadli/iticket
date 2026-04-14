package com.example.IticketProject.repository;

import com.example.IticketProject.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByUserIdOrderByCreatedAtDesc(Long userId);
}
