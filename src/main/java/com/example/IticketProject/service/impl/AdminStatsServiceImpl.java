package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.admin.AdminStatsResponse;
import com.example.IticketProject.entity.Order;
import com.example.IticketProject.enums.EventStatus;
import com.example.IticketProject.enums.OrderStatus;
import com.example.IticketProject.repository.*;
import com.example.IticketProject.service.AdminStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminStatsServiceImpl implements AdminStatsService {
    private final UserRepository users;
    private final OrderRepository orders;
    private final TicketRepository tickets;
    private final EventRepository events;

    @Override
    public AdminStatsResponse stats() {
        long totalUsers = users.count();
        long totalOrders = orders.count();
        long soldTickets = tickets.count();
        BigDecimal revenue = orders.findAll().stream()
                .filter(o -> o.getStatus() == OrderStatus.PAID)
                .map(Order::getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        long upcoming = events.findAll().stream()
                .filter(e -> e.getStatus() == EventStatus.PUBLISHED && e.getStartsAt().isAfter(LocalDateTime.now()))
                .count();
        return new AdminStatsResponse(totalUsers, totalOrders, soldTickets, revenue, upcoming);
    }
}
