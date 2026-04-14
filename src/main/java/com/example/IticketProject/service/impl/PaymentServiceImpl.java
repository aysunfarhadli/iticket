package com.example.IticketProject.service.impl;

import com.example.IticketProject.dto.payment.PaymentRequest;
import com.example.IticketProject.dto.payment.PaymentResponse;
import com.example.IticketProject.entity.*;
import com.example.IticketProject.enums.OrderStatus;
import com.example.IticketProject.enums.PaymentStatus;
import com.example.IticketProject.enums.TicketStatus;
import com.example.IticketProject.exception.BadRequestException;
import com.example.IticketProject.exception.NotFoundException;
import com.example.IticketProject.repository.*;
import com.example.IticketProject.security.CurrentUser;
import com.example.IticketProject.service.EmailService;
import com.example.IticketProject.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orders;
    private final PaymentRepository payments;
    private final InvoiceRepository invoices;
    private final TicketRepository tickets;
    private final EmailService email;
    private final CurrentUser currentUser;

    @Override
    @Transactional
    public PaymentResponse pay(PaymentRequest req) {
        Order o = orders.findById(req.orderId())
                .orElseThrow(() -> new NotFoundException("Order", req.orderId()));
        User u = currentUser.get();
        if (!o.getUser().getId().equals(u.getId()))
            throw new BadRequestException("Forbidden");
        if (o.getStatus() == OrderStatus.PAID)
            throw new BadRequestException("Order already paid");

        boolean ok = !req.cardNumber().endsWith("0000");
        Payment p = Payment.builder()
                .order(o).transactionId("TX-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase())
                .amount(o.getTotalAmount()).method("MOCK_CARD")
                .status(ok ? PaymentStatus.SUCCESS : PaymentStatus.FAILED).build();
        o.setPayment(p);

        if (ok) {
            o.setStatus(OrderStatus.PAID);
            Invoice inv = Invoice.builder()
                    .order(o).invoiceNumber("INV-" + o.getOrderNumber().substring(4))
                    .issueDate(LocalDate.now()).totalAmount(o.getTotalAmount())
                    .notes("Pickup: " + o.getPickupMethod()).build();
            o.setInvoice(inv);
            for (OrderItem it : o.getItems()) {
                for (int i = 0; i < it.getQuantity(); i++) {
                    tickets.save(Ticket.builder()
                            .code("TCK-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                            .status(TicketStatus.ISSUED).ticketType(it.getTicketType())
                            .order(o).user(u).build());
                }
            }
            email.sendOrderConfirmation(o);
        } else {
            o.setStatus(OrderStatus.FAILED);
        }
        payments.save(p);
        orders.save(o);
        return new PaymentResponse(p.getId(), p.getTransactionId(), p.getStatus(),
                p.getAmount(), p.getMethod(), o.getOrderNumber());
    }
}
