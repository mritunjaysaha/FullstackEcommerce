package com.springboot.ecommerce.controller;

import com.springboot.ecommerce.entity.Product;
import com.springboot.ecommerce.entity.User;
import com.springboot.ecommerce.repository.ProductRepository;
import com.springboot.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/product")
public class AdminController {

    private byte[] bytes;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    public List<Product> allAccess() {
        return productRepository.findAll();
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String helloAdmin() {
        return "hello admin";
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> showUsers() {
        User admin = userRepository.findById(1L).get();
        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(admin.getId()))
                .collect(Collectors.toList());
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createProduct(@RequestBody Product product) {
        product.setImage(this.bytes);
        productRepository.save(product);
        this.bytes = null;
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Product> showProducts() {
        return productRepository.findAll();
    }
}
