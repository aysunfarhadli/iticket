package com.example.IticketProject.controller;

import com.example.IticketProject.dto.catalog.*;
import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CatalogController {
    private final CatalogService catalog;

    @GetMapping("/api/categories")
    public ApiResponse<List<CategoryResponse>> categories() { return ApiResponse.ok(catalog.listCategories()); }

    @GetMapping("/api/cities")
    public ApiResponse<List<CityResponse>> cities() { return ApiResponse.ok(catalog.listCities()); }

    @GetMapping("/api/venues")
    public ApiResponse<List<VenueResponse>> venues() { return ApiResponse.ok(catalog.listVenues()); }
}
