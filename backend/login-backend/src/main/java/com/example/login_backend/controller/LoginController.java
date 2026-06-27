package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.login_backend.service.UserService;
import com.example.login_backend.model.User;
import com.example.login_backend.security.JwtUtil;
import com.example.login_backend.dto.LoginResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){

        User existingUser = service.checkLogin(user);

        if(existingUser != null){

            String token =
                    JwtUtil.generateToken(
                            existingUser.getEmail()
                    );
            return ResponseEntity.ok(
                    new LoginResponse(
                            token,
                            existingUser.getId(),
                            existingUser.getEmail(),
                            existingUser.getRole()
                    )
            );

        } else {

            return ResponseEntity
                    .status(401)
                    .body("Invalid Credentials");
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user){

        boolean status = service.registerUser(user);

        if(status){
            return ResponseEntity.ok("Registration Successful");
        } else {
            return ResponseEntity.badRequest().body("User Already Exists");
        }
    }
    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody User user){

        User existingUser = service.checkLogin(user);

        if(existingUser != null &&
                "ADMIN".equals(existingUser.getRole())){

            String token = JwtUtil.generateToken(
                    existingUser.getEmail()
            );

            return ResponseEntity.ok(
                    new LoginResponse(
                            token,
                            existingUser.getId(),
                            existingUser.getEmail(),
                            existingUser.getRole()
                    )
            );
        }

        return ResponseEntity
                .status(401)
                .body("Invalid Admin Credentials");
    }



}
