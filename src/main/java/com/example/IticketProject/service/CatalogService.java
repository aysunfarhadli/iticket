package com.example.IticketProject.service;

import com.example.IticketProject.dto.catalog.*;

import java.util.List;

public interface CatalogService {
    List<CityResponse> listCities();
    CityResponse createCity(CityRequest r);
    CityResponse updateCity(Long id, CityRequest r);
    void deleteCity(Long id);

    List<VenueResponse> listVenues();
    VenueResponse createVenue(VenueRequest r);
    VenueResponse updateVenue(Long id, VenueRequest r);
    void deleteVenue(Long id);

    List<CategoryResponse> listCategories();
    CategoryResponse createCategory(CategoryRequest r);
    CategoryResponse updateCategory(Long id, CategoryRequest r);
    void deleteCategory(Long id);
}
