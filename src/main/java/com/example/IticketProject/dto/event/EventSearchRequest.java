package com.example.IticketProject.dto.event;

import java.time.LocalDate;

public record EventSearchRequest(
        String q,
        Long categoryId,
        Long cityId,
        LocalDate dateFrom,
        LocalDate dateTo
) {}
