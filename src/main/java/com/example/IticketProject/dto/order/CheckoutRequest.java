package com.example.IticketProject.dto.order;

import com.example.IticketProject.enums.PickupMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.List;

public record CheckoutRequest(
        @NotEmpty @Valid List<CheckoutItem> items,
        @NotNull PickupMethod pickupMethod
) {
    public record CheckoutItem(
            @NotNull Long ticketTypeId,
            @NotNull @Min(1) Integer quantity
    ) {}
}
