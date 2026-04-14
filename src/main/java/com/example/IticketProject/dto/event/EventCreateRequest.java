package com.example.IticketProject.dto.event;

import com.example.IticketProject.enums.EventStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import java.util.List;

public record EventCreateRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 4000) String description,
        @Size(max = 500) String coverImageUrl,
        @NotNull @Future LocalDateTime startsAt,
        LocalDateTime endsAt,
        EventStatus status,
        boolean featured,
        @NotNull Long categoryId,
        @NotNull Long venueId,
        @Valid @NotEmpty List<TicketTypeRequest> ticketTypes,
        List<@Size(max = 500) String> images
) {}
