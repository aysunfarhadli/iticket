package com.example.IticketProject.dto.event;

import com.example.IticketProject.enums.EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record EventUpdateRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 4000) String description,
        @Size(max = 500) String coverImageUrl,
        @NotNull LocalDateTime startsAt,
        LocalDateTime endsAt,
        EventStatus status,
        boolean featured,
        @NotNull Long categoryId,
        @NotNull Long venueId
) {}
