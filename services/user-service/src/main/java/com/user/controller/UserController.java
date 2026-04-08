package com.user.controller;

import com.user.model.User;
import com.user.service.UserService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import java.util.Optional;

@Controller("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Get("/{id}")
    public HttpResponse<User> findById(Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(HttpResponse::ok).orElse(HttpResponse.notFound());
    }

    @Get
    public Iterable<User> list() {
        return userService.findAll();
    }
}