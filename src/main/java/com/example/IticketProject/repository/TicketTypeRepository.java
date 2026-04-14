package com.example.IticketProject.repository;

import com.example.IticketProject.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {}
