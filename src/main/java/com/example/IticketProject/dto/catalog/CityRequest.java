package com.example.IticketProject.dto.catalog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CityRequest(@NotBlank @Size(max = 80) String name, @Size(max = 80) String country) {}
