package com.example.login_backend.dto;

public class LoginResponse {

    private String token;
    private int id;
    private String email;
    private String role;

    public LoginResponse(
            String token,
            int id,
            String email,
            String role
    ) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}