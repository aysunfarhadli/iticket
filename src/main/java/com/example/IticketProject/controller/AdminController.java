package com.example.IticketProject.controller;

import com.example.IticketProject.dto.admin.AdminStatsResponse;
import com.example.IticketProject.dto.catalog.*;
import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.dto.common.PageResponse;
import com.example.IticketProject.dto.event.*;
import com.example.IticketProject.dto.order.OrderResponse;
import com.example.IticketProject.dto.user.UserProfileResponse;
import com.example.IticketProject.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminStatsService stats;
    private final EventService events;
    private final CatalogService catalog;
    private final UserService users;
    private final OrderService orders;

    @GetMapping("/stats")
    public ApiResponse<AdminStatsResponse> stats() { return ApiResponse.ok(stats.stats()); }

    @PostMapping("/events")
    public ApiResponse<EventResponse> createEvent(@Valid @RequestBody EventCreateRequest req) {
        return ApiResponse.ok(events.create(req), "Event created");
    }
    @PutMapping("/events/{id}")
    public ApiResponse<EventResponse> updateEvent(@PathVariable Long id, @Valid @RequestBody EventUpdateRequest req) {
        return ApiResponse.ok(events.update(id, req), "Event updated");
    }
    @DeleteMapping("/events/{id}")
    public ApiResponse<Void> deleteEvent(@PathVariable Long id) { events.delete(id); return ApiResponse.ok(null, "Deleted"); }

    @PostMapping("/cities") public ApiResponse<CityResponse> createCity(@Valid @RequestBody CityRequest r) { return ApiResponse.ok(catalog.createCity(r)); }
    @PutMapping("/cities/{id}") public ApiResponse<CityResponse> updateCity(@PathVariable Long id, @Valid @RequestBody CityRequest r) { return ApiResponse.ok(catalog.updateCity(id, r)); }
    @DeleteMapping("/cities/{id}") public ApiResponse<Void> deleteCity(@PathVariable Long id) { catalog.deleteCity(id); return ApiResponse.ok(null); }

    @PostMapping("/venues") public ApiResponse<VenueResponse> createVenue(@Valid @RequestBody VenueRequest r) { return ApiResponse.ok(catalog.createVenue(r)); }
    @PutMapping("/venues/{id}") public ApiResponse<VenueResponse> updateVenue(@PathVariable Long id, @Valid @RequestBody VenueRequest r) { return ApiResponse.ok(catalog.updateVenue(id, r)); }
    @DeleteMapping("/venues/{id}") public ApiResponse<Void> deleteVenue(@PathVariable Long id) { catalog.deleteVenue(id); return ApiResponse.ok(null); }

    @PostMapping("/categories") public ApiResponse<CategoryResponse> createCat(@Valid @RequestBody CategoryRequest r) { return ApiResponse.ok(catalog.createCategory(r)); }
    @PutMapping("/categories/{id}") public ApiResponse<CategoryResponse> updateCat(@PathVariable Long id, @Valid @RequestBody CategoryRequest r) { return ApiResponse.ok(catalog.updateCategory(id, r)); }
    @DeleteMapping("/categories/{id}") public ApiResponse<Void> deleteCat(@PathVariable Long id) { catalog.deleteCategory(id); return ApiResponse.ok(null); }

    @GetMapping("/users") public ApiResponse<List<UserProfileResponse>> listUsers() { return ApiResponse.ok(users.adminListAll()); }

    @GetMapping("/orders")
    public ApiResponse<PageResponse<OrderResponse>> allOrders(Pageable pageable) {
        return ApiResponse.ok(PageResponse.from(orders.adminAll(pageable)));
    }
}
