package com.example.IticketProject.mapper;

import com.example.IticketProject.dto.catalog.*;
import com.example.IticketProject.entity.City;
import com.example.IticketProject.entity.EventCategory;
import com.example.IticketProject.entity.Venue;
import org.springframework.stereotype.Component;

@Component
public class CatalogMapper {
    public CityResponse toCity(City c) { return new CityResponse(c.getId(), c.getName(), c.getCountry()); }
    public VenueResponse toVenue(Venue v) {
        return new VenueResponse(v.getId(), v.getName(), v.getAddress(), v.getCapacity(),
                v.getCity().getId(), v.getCity().getName());
    }
    public CategoryResponse toCategory(EventCategory c) {
        return new CategoryResponse(c.getId(), c.getName(), c.getSlug(), c.getIcon());
    }
}
