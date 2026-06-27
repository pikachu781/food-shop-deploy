package com.example.login_backend.controller;

import com.example.login_backend.entity.Order;
import com.example.login_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200") // ✅ Important
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // ✅ Get all orders (admin)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ Create order (checkout)
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    // 🔥 VERY IMPORTANT - Get orders by userId
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }
    @PutMapping("/{id}")
    public Order updateStatus(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order order = orderRepository.findById(id).orElseThrow();

        order.setStatus(updatedOrder.getStatus());

        return orderRepository.save(order);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}