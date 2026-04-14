package com.example.IticketProject.dto.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PaymentRequest(
        @NotNull Long orderId,
        @NotBlank String cardHolder,
        @NotBlank String cardNumber,
        @NotBlank String expiry,
        @NotBlank String cvv
) {}
