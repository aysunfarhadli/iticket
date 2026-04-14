package com.example.IticketProject.service;

import com.example.IticketProject.dto.invoice.InvoiceResponse;
import com.example.IticketProject.dto.order.CheckoutRequest;
import com.example.IticketProject.dto.order.OrderResponse;
import com.example.IticketProject.dto.ticket.TicketResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    OrderResponse checkout(CheckoutRequest req);
    Page<OrderResponse> myOrders(Pageable pageable);
    OrderResponse get(Long id);
    List<TicketResponse> myTickets();
    TicketResponse transferTicket(Long ticketId, com.example.IticketProject.dto.ticket.TransferRequest req);
    InvoiceResponse invoice(Long orderId);
    Page<OrderResponse> adminAll(Pageable pageable);
}
