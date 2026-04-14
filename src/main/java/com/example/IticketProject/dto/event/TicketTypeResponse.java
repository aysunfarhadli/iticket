package com.example.IticketProject.dto.event;

import java.math.BigDecimal;

public record TicketTypeResponse(
        Long id,
        String name,
        BigDecimal price,
        Integer quota,
        Integer sold,
        Integer available
) {}
