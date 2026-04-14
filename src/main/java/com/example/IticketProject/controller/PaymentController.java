package com.example.IticketProject.controller;

import com.example.IticketProject.dto.common.ApiResponse;
import com.example.IticketProject.dto.payment.PaymentRequest;
import com.example.IticketProject.dto.payment.PaymentResponse;
import com.example.IticketProject.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService payments;

    @PostMapping
    public ApiResponse<PaymentResponse> pay(@Valid @RequestBody PaymentRequest req) {
        return ApiResponse.ok(payments.pay(req), "Payment processed");
    }
}
