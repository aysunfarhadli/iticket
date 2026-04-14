package com.example.IticketProject.dto.booking;

import com.example.IticketProject.enums.BookingStatus;

import java.time.Instant;

public record BookingResponse(
        Long id,
        Long ticketTypeId,
        String ticketTypeName,
        String eventTitle,
        Integer quantity,
        BookingStatus status,
        Instant expiresAt
) {}
