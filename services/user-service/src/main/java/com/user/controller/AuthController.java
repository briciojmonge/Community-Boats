package main.java.com.user.controller;

import com.user.dto.LoginRequest;
import com.user.dto.JwtResponse;
import com.user.model.User;
import com.user.model.UserRole;
import com.user.security.JwtUtil;
import com.user.service.UserService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;

@Controller("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Post("/register")
    public HttpResponse<?> register(@Body User user) {
        if (user.getRole() == null) user.setRole(UserRole.TOURIST);
        User saved = userService.register(user);
        String token = JwtUtil.generateToken(saved.getId(), saved.getRole());
        return HttpResponse.created(new JwtResponse(token));
    }

    @Post("/login")
    public HttpResponse<?> login(@Body LoginRequest req) {
        return userService.login(req.getEmail(), req.getPassword())
                .map(user -> HttpResponse.ok(new JwtResponse(JwtUtil.generateToken(user.getId(), user.getRole()))))
                .orElse(HttpResponse.unauthorized());
    }
}