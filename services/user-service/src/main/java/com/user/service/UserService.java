package com.user.service;

import com.user.model.User;
import com.user.repository.UserRepository;
import jakarta.inject.Singleton;
import java.util.Optional;
import java.security.MessageDigest;
import java.util.Base64;

@Singleton
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public User register(User user) {
        // Validar que el email no exista
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email ya registrado");
        }
        // Hashear contraseña
        user.setPassword(hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(hashPassword(password))) {
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }
}
