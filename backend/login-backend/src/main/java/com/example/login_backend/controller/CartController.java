package com.example.login_backend.controller;

import com.example.login_backend.repository.CartRepository;
import jakarta.transaction.Transactional;  // Important!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import com.example.login_backend.entity.Cart;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository repo;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return repo.save(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ✅ This is the fix: Add @Transactional
    @DeleteMapping("/clear/{userId}")
    @Transactional
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        repo.deleteByUserId(userId); // now works inside transaction
        return ResponseEntity.ok("Cart cleared successfully!");
    }
}