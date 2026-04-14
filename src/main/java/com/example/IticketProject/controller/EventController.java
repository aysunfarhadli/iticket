package com.example.IticketProject.controller;

import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.dto.common.PageResponse;
import com.example.IticketProject.dto.event.*;
import com.example.IticketProject.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService events;

    @GetMapping
    public ApiResponse<PageResponse<EventResponse>> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) LocalDate dateFrom,
            @RequestParam(required = false) LocalDate dateTo,
            Pageable pageable) {
        return ApiResponse.ok(PageResponse.from(
                events.search(new EventSearchRequest(q, categoryId, cityId, dateFrom, dateTo), pageable)));
    }

    @GetMapping("/featured")
    public ApiResponse<List<EventResponse>> featured() { return ApiResponse.ok(events.featured()); }

    @GetMapping("/upcoming")
    public ApiResponse<List<EventResponse>> upcoming() { return ApiResponse.ok(events.upcoming()); }

    @GetMapping("/{id}")
    public ApiResponse<EventResponse> get(@PathVariable Long id) { return ApiResponse.ok(events.get(id)); }
}
