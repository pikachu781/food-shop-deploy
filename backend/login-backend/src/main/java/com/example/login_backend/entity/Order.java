package com.example.login_backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;   // ✅ Correct field

    private double totalAmount;
    private String status;   // Pending, Preparing, Delivered
    private String orderDate;

    @ElementCollection
    @CollectionTable(name = "order_items",
            joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "item")
    private List<String> items;

    // ✅ Default constructor
    public Order() {}

    // ✅ Correct constructor
    public Order(Long userId, double totalAmount, List<String> items) {
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.items = items;
        this.status = "Pending";   // default
        this.orderDate = java.time.LocalDateTime.now().toString();
    }

    // ✅ Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}