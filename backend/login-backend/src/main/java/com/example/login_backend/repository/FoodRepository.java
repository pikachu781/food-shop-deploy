package com.example.login_backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.example.login_backend.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
