package com.example.login_backend.repository;

import com.example.login_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // ✅ VERY IMPORTANT
    List<Order> findByUserId(Long userId);
}