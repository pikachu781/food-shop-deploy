package com.example.login_backend.repository;



import com.example.login_backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}

