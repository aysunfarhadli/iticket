package com.example.IticketProject.dto.ticket;

import com.example.IticketProject.enums.TicketStatus;

import java.time.LocalDateTime;

public record TicketResponse(
        Long id,
        String code,
        TicketStatus status,
        String eventTitle,
        String venueName,
        LocalDateTime startsAt,
        String ticketTypeName,
        String orderNumber
) {}
