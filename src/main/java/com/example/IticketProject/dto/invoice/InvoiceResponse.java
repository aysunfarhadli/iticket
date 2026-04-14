package com.example.IticketProject.dto.invoice;

import com.example.IticketProject.dto.order.OrderItemResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record InvoiceResponse(
        Long id,
        String invoiceNumber,
        String orderNumber,
        LocalDate issueDate,
        BigDecimal totalAmount,
        String customerName,
        String customerEmail,
        String pickupMethod,
        List<OrderItemResponse> items,
        String notes
) {}
