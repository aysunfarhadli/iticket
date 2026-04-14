package com.example.IticketProject.service;

import com.example.IticketProject.dto.payment.PaymentRequest;
import com.example.IticketProject.dto.payment.PaymentResponse;

public interface PaymentService {
    PaymentResponse pay(PaymentRequest req);
}
