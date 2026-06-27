package com.example.login_backend.controller;

import com.example.login_backend.entity.Food;
import com.example.login_backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
public class FoodController {

    @Autowired
    private FoodRepository repo;

    private final String uploadDir = "uploads/";

    // GET ALL FOODS
    @GetMapping("/foods")
    public List<Food> getAllFoods() {
        return repo.findAll();
    }

    @PostMapping("/foods")
    public Food addFood(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("image") MultipartFile file
    ) throws IOException {

        // ✅ Create uploads folder if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = uploadPath.resolve(fileName);

        Files.write(path, file.getBytes());

        Food food = new Food();
        food.setName(name);
        food.setDescription(description);
        food.setPrice(price);
        food.setImage(fileName);

        return repo.save(food);
    }


    // UPDATE NAME, DESCRIPTION, PRICE
    @PutMapping("/foods/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody Food updatedFood) {

        Food food = repo.findById(id).orElseThrow();

        food.setName(updatedFood.getName());
        food.setDescription(updatedFood.getDescription());
        food.setPrice(updatedFood.getPrice());

        return repo.save(food);
    }

    // DELETE
    @DeleteMapping("/foods/{id}")
    public void deleteFood(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // SERVE IMAGE
    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) throws IOException {

        Path path = Paths.get(uploadDir + fileName);
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}
