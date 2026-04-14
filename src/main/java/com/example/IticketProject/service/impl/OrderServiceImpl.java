package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.invoice.InvoiceResponse;
import com.example.IticketProject.dto.order.CheckoutRequest;
import com.example.IticketProject.dto.order.OrderItemResponse;
import com.example.IticketProject.dto.order.OrderResponse;
import com.example.IticketProject.dto.ticket.TicketResponse;
import com.example.IticketProject.entity.*;
import com.example.IticketProject.enums.OrderStatus;
import com.example.IticketProject.exception.BadRequestException;
import com.example.IticketProject.exception.NotFoundException;
import com.example.IticketProject.mapper.OrderMapper;
import com.example.IticketProject.repository.*;
import com.example.IticketProject.security.CurrentUser;
import com.example.IticketProject.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orders;
    private final TicketTypeRepository ticketTypes;
    private final TicketRepository tickets;
    private final UserRepository userRepo;
    private final OrderMapper mapper;
    private final CurrentUser currentUser;

    @Override
    @Transactional
    public OrderResponse checkout(CheckoutRequest req) {
        User u = currentUser.get();
        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(u).status(OrderStatus.PENDING).pickupMethod(req.pickupMethod())
                .totalAmount(BigDecimal.ZERO).build();
        BigDecimal total = BigDecimal.ZERO;
        for (CheckoutRequest.CheckoutItem ci : req.items()) {
            TicketType tt = ticketTypes.findById(ci.ticketTypeId())
                    .orElseThrow(() -> new NotFoundException("TicketType", ci.ticketTypeId()));
            if (tt.available() < ci.quantity())
                throw new BadRequestException("Not enough seats for " + tt.getName());
            tt.setSold(tt.getSold() + ci.quantity());
            BigDecimal subtotal = tt.getPrice().multiply(BigDecimal.valueOf(ci.quantity()));
            order.getItems().add(OrderItem.builder()
                    .order(order).ticketType(tt).quantity(ci.quantity())
                    .unitPrice(tt.getPrice()).subtotal(subtotal).build());
            total = total.add(subtotal);
        }
        order.setTotalAmount(total);
        return mapper.toOrder(orders.save(order));
    }

    @Override
    public Page<OrderResponse> myOrders(Pageable pageable) {
        User u = currentUser.get();
        return orders.findAllByUserIdOrderByCreatedAtDesc(u.getId(), pageable).map(mapper::toOrder);
    }

    @Override
    public OrderResponse get(Long id) {
        Order o = orders.findById(id).orElseThrow(() -> new NotFoundException("Order", id));
        User u = currentUser.get();
        boolean isAdmin = u.getRoles().stream().anyMatch(r -> r.getName().name().equals("ADMIN"));
        if (!isAdmin && !o.getUser().getId().equals(u.getId()))
            throw new BadRequestException("Forbidden");
        return mapper.toOrder(o);
    }

    @Override
    public List<TicketResponse> myTickets() {
        User u = currentUser.get();
        return tickets.findAllByUserIdOrderByCreatedAtDesc(u.getId()).stream().map(t ->
                new TicketResponse(t.getId(), t.getCode(), t.getStatus(),
                        t.getTicketType().getEvent().getTitle(),
                        t.getTicketType().getEvent().getVenue().getName(),
                        t.getTicketType().getEvent().getStartsAt(),
                        t.getTicketType().getName(),
                        t.getOrder().getOrderNumber())).toList();
    }

    @Override
    public InvoiceResponse invoice(Long orderId) {
        Order o = orders.findById(orderId).orElseThrow(() -> new NotFoundException("Order", orderId));
        User u = currentUser.get();
        boolean isAdmin = u.getRoles().stream().anyMatch(r -> r.getName().name().equals("ADMIN"));
        if (!isAdmin && !o.getUser().getId().equals(u.getId()))
            throw new BadRequestException("Forbidden");
        Invoice inv = o.getInvoice();
        if (inv == null) throw new NotFoundException("Invoice for order " + orderId + " not found");
        List<OrderItemResponse> items = o.getItems().stream().map(mapper::toItem).toList();
        return new InvoiceResponse(inv.getId(), inv.getInvoiceNumber(), o.getOrderNumber(),
                inv.getIssueDate(), inv.getTotalAmount(),
                o.getUser().getFullName(), o.getUser().getEmail(),
                o.getPickupMethod().name(), items, inv.getNotes());
    }

    @Override
    public Page<OrderResponse> adminAll(Pageable pageable) {
        return orders.findAll(pageable).map(mapper::toOrder);
    }

    @Override
    @Transactional
    public TicketResponse transferTicket(Long ticketId, com.example.IticketProject.dto.ticket.TransferRequest req) {
        User me = currentUser.get();
        Ticket t = tickets.findById(ticketId).orElseThrow(() -> new NotFoundException("Ticket", ticketId));
        if (!t.getUser().getId().equals(me.getId()))
            throw new BadRequestException("You can only transfer your own tickets");
        if (t.getStatus() != com.example.IticketProject.enums.TicketStatus.ISSUED)
            throw new BadRequestException("Only ISSUED tickets can be transferred");
        if (req.recipientEmail().equalsIgnoreCase(me.getEmail()))
            throw new BadRequestException("Cannot transfer to yourself");
        User recipient = userRepo.findByEmailIgnoreCase(req.recipientEmail())
                .orElseThrow(() -> new NotFoundException("Recipient with email " + req.recipientEmail() + " not found"));
        t.setUser(recipient);
        return new TicketResponse(t.getId(), t.getCode(), t.getStatus(),
                t.getTicketType().getEvent().getTitle(),
                t.getTicketType().getEvent().getVenue().getName(),
                t.getTicketType().getEvent().getStartsAt(),
                t.getTicketType().getName(),
                t.getOrder().getOrderNumber());
    }
}
