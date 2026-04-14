package com.example.IticketProject.mapper;

import com.example.IticketProject.dto.order.OrderItemResponse;
import com.example.IticketProject.dto.order.OrderResponse;
import com.example.IticketProject.entity.Order;
import com.example.IticketProject.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {
    public OrderItemResponse toItem(OrderItem i) {
        return new OrderItemResponse(i.getId(), i.getTicketType().getId(),
                i.getTicketType().getName(), i.getTicketType().getEvent().getTitle(),
                i.getQuantity(), i.getUnitPrice(), i.getSubtotal());
    }

    public OrderResponse toOrder(Order o) {
        List<OrderItemResponse> items = o.getItems().stream().map(this::toItem).toList();
        return new OrderResponse(o.getId(), o.getOrderNumber(), o.getStatus(), o.getPickupMethod(),
                o.getTotalAmount(), o.getCreatedAt(), items,
                o.getPayment() != null ? o.getPayment().getTransactionId() : null,
                o.getInvoice() != null ? o.getInvoice().getInvoiceNumber() : null);
    }
}
