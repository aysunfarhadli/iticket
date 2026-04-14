package com.example.IticketProject.dto.event;

import com.example.IticketProject.enums.EventStatus;

import java.time.LocalDateTime;
import java.util.List;

public record EventResponse(
        Long id,
        String title,
        String slug,
        String description,
        String coverImageUrl,
        LocalDateTime startsAt,
        LocalDateTime endsAt,
        EventStatus status,
        boolean featured,
        String categoryName,
        Long categoryId,
        String venueName,
        String cityName,
        String venueAddress,
        List<TicketTypeResponse> ticketTypes,
        List<String> images
) {}
