package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.login_backend.model.User;
import com.example.login_backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/users")   // ✅ change to plural
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ GET all users (IMPORTANT for admin dashboard)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ GET single user by email
    @GetMapping("/{email}")
    public User getProfile(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ UPDATE user
    @PutMapping("/update")
    public User updateProfile(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ DELETE user (IMPORTANT)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}