package com.example.login_backend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.login_backend.config.RazorpayConfig;

@Service
public class PaymentService {

    @Autowired
    private RazorpayConfig razorpayConfig;

    public String createOrder(Double amount) {

        try {

            RazorpayClient razorpay =
                    new RazorpayClient(
                            razorpayConfig.getKeyId(),
                            razorpayConfig.getKeySecret()
                    );

            JSONObject orderRequest = new JSONObject();

            orderRequest.put(
                    "amount",
                    amount * 100
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    "receipt_" + System.currentTimeMillis()
            );

            Order order =
                    razorpay.orders.create(orderRequest);

            return order.toString();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}