package com.example.IticketProject.service;

import com.example.IticketProject.entity.Order;

public interface EmailService {
    void sendOrderConfirmation(Order order);
}
