package com.example.IticketProject.dto.payment;

import com.example.IticketProject.enums.PaymentStatus;

import java.math.BigDecimal;

public record PaymentResponse(
        Long id,
        String transactionId,
        PaymentStatus status,
        BigDecimal amount,
        String method,
        String orderNumber
) {}
