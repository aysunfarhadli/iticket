package com.example.IticketProject.dto.order;

import com.example.IticketProject.enums.OrderStatus;
import com.example.IticketProject.enums.PickupMethod;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,
        OrderStatus status,
        PickupMethod pickupMethod,
        BigDecimal totalAmount,
        Instant createdAt,
        List<OrderItemResponse> items,
        String paymentTransactionId,
        String invoiceNumber
) {}
