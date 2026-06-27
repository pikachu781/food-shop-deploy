package com.example.login_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.login_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
