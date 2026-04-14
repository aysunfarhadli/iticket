package com.example.IticketProject.dto.catalog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record VenueRequest(
        @NotBlank @Size(max = 160) String name,
        @Size(max = 255) String address,
        Integer capacity,
        @NotNull Long cityId
) {}
