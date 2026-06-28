package com.example.login_backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.login_backend.entity.Food;
import com.example.login_backend.repository.FoodRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {
        "http://localhost:4200",
        "https://food-shop-deploy.vercel.app"
})
@RequestMapping("/admin")
public class FoodController {

    @Autowired
    private FoodRepository repo;

    @Autowired
    private Cloudinary cloudinary;

    // GET ALL FOODS
    @GetMapping("/foods")
    public List<Food> getAllFoods() {
        return repo.findAll();
    }

    // ADD FOOD
    @PostMapping("/foods")
    public Food addFood(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("image") MultipartFile file
    ) throws IOException {

        // Upload image to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        Food food = new Food();
        food.setName(name);
        food.setDescription(description);
        food.setPrice(price);
        food.setImage(imageUrl);

        return repo.save(food);
    }

    // UPDATE FOOD
    @PutMapping("/foods/{id}")
    public Food updateFood(@PathVariable Long id,
                           @RequestBody Food updatedFood) {

        Food food = repo.findById(id).orElseThrow();

        food.setName(updatedFood.getName());
        food.setDescription(updatedFood.getDescription());
        food.setPrice(updatedFood.getPrice());

        return repo.save(food);
    }

    // DELETE FOOD
    @DeleteMapping("/foods/{id}")
    public void deleteFood(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
