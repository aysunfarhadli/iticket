package com.example.IticketProject.controller;

import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.dto.common.PageResponse;
import com.example.IticketProject.dto.invoice.InvoiceResponse;
import com.example.IticketProject.dto.order.CheckoutRequest;
import com.example.IticketProject.dto.order.OrderResponse;
import com.example.IticketProject.dto.ticket.TicketResponse;
import com.example.IticketProject.dto.ticket.TransferRequest;
import com.example.IticketProject.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orders;

    @PostMapping("/checkout")
    public ApiResponse<OrderResponse> checkout(@Valid @RequestBody CheckoutRequest req) {
        return ApiResponse.ok(orders.checkout(req), "Order created");
    }

    @GetMapping
    public ApiResponse<PageResponse<OrderResponse>> mine(Pageable pageable) {
        return ApiResponse.ok(PageResponse.from(orders.myOrders(pageable)));
    }

    @GetMapping("/tickets")
    public ApiResponse<List<TicketResponse>> tickets() { return ApiResponse.ok(orders.myTickets()); }

    @PostMapping("/tickets/{id}/transfer")
    public ApiResponse<TicketResponse> transferTicket(@PathVariable Long id, @Valid @RequestBody TransferRequest req) {
        return ApiResponse.ok(orders.transferTicket(id, req), "Ticket successfully transferred!");
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> get(@PathVariable Long id) { return ApiResponse.ok(orders.get(id)); }

    @GetMapping("/{id}/invoice")
    public ApiResponse<InvoiceResponse> invoice(@PathVariable Long id) {
        return ApiResponse.ok(orders.invoice(id));
    }
}
