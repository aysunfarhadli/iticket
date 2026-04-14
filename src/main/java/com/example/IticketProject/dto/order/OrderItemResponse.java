package com.example.IticketProject.dto.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long ticketTypeId,
        String ticketTypeName,
        String eventTitle,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal
) {}
