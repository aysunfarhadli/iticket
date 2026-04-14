package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.catalog.*;
import com.example.IticketProject.entity.City;
import com.example.IticketProject.entity.EventCategory;
import com.example.IticketProject.entity.Venue;
import com.example.IticketProject.exception.NotFoundException;
import com.example.IticketProject.mapper.CatalogMapper;
import com.example.IticketProject.repository.CityRepository;
import com.example.IticketProject.repository.EventCategoryRepository;
import com.example.IticketProject.repository.VenueRepository;
import com.example.IticketProject.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatalogServiceImpl implements CatalogService {
    private final CityRepository cityRepo;
    private final VenueRepository venueRepo;
    private final EventCategoryRepository catRepo;
    private final CatalogMapper mapper;

    public List<CityResponse> listCities() { return cityRepo.findAll().stream().map(mapper::toCity).toList(); }
    public CityResponse createCity(CityRequest r) {
        return mapper.toCity(cityRepo.save(City.builder().name(r.name()).country(r.country()).build()));
    }
    public CityResponse updateCity(Long id, CityRequest r) {
        City c = cityRepo.findById(id).orElseThrow(() -> new NotFoundException("City", id));
        c.setName(r.name()); c.setCountry(r.country());
        return mapper.toCity(cityRepo.save(c));
    }
    public void deleteCity(Long id) { cityRepo.deleteById(id); }

    public List<VenueResponse> listVenues() { return venueRepo.findAll().stream().map(mapper::toVenue).toList(); }
    public VenueResponse createVenue(VenueRequest r) {
        City city = cityRepo.findById(r.cityId()).orElseThrow(() -> new NotFoundException("City", r.cityId()));
        return mapper.toVenue(venueRepo.save(Venue.builder()
                .name(r.name()).address(r.address()).capacity(r.capacity()).city(city).build()));
    }
    public VenueResponse updateVenue(Long id, VenueRequest r) {
        Venue v = venueRepo.findById(id).orElseThrow(() -> new NotFoundException("Venue", id));
        v.setName(r.name()); v.setAddress(r.address()); v.setCapacity(r.capacity());
        v.setCity(cityRepo.findById(r.cityId()).orElseThrow(() -> new NotFoundException("City", r.cityId())));
        return mapper.toVenue(venueRepo.save(v));
    }
    public void deleteVenue(Long id) { venueRepo.deleteById(id); }

    public List<CategoryResponse> listCategories() { return catRepo.findAll().stream().map(mapper::toCategory).toList(); }
    public CategoryResponse createCategory(CategoryRequest r) {
        return mapper.toCategory(catRepo.save(EventCategory.builder()
                .name(r.name()).slug(r.slug()).icon(r.icon()).build()));
    }
    public CategoryResponse updateCategory(Long id, CategoryRequest r) {
        EventCategory c = catRepo.findById(id).orElseThrow(() -> new NotFoundException("Category", id));
        c.setName(r.name()); c.setSlug(r.slug()); c.setIcon(r.icon());
        return mapper.toCategory(catRepo.save(c));
    }
    public void deleteCategory(Long id) { catRepo.deleteById(id); }
}
