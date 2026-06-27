package com.example.login_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.login_backend.repository.UserRepository;
import com.example.login_backend.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // 🔐 LOGIN METHOD
    public User checkLogin(User user){
        return repo.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );
    }

    // 📝 SIGNUP METHOD (ADD THIS)
    public boolean registerUser(User user){

        User existingUser = repo.findByEmail(user.getEmail());

        if(existingUser != null){
            return false;   // user already exists
        }

        repo.save(user);
        return true;   // registration successful
    }
}
