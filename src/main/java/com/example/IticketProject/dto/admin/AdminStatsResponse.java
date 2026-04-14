package com.example.IticketProject.dto.admin;

import java.math.BigDecimal;

public record AdminStatsResponse(
        long totalUsers,
        long totalOrders,
        long soldTickets,
        BigDecimal totalRevenue,
        long upcomingEvents
) {}
