package com.example.IticketProject.dto.event;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record TicketTypeRequest(
        @NotBlank @Size(max = 80) String name,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @NotNull @Min(1) Integer quota
) {}
