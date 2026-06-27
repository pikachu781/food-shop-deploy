package com.example.login_backend.controller;

import com.example.login_backend.model.User;
import com.example.login_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    // Update Profile
    @PostMapping("/update")
    public User updateProfile(@RequestBody User user){

        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getName() != null)
            existingUser.setName(user.getName());

        if(user.getEmail() != null)
            existingUser.setEmail(user.getEmail());

        if(user.getPhone() != null)
            existingUser.setPhone(user.getPhone());

        if(user.getAddress() != null)
            existingUser.setAddress(user.getAddress());

        return userRepository.save(existingUser);
    }

    // Get Profile
    @GetMapping("/{id}")
    public Optional<User> getProfile(@PathVariable int id){
        return userRepository.findById(id);
    }
}