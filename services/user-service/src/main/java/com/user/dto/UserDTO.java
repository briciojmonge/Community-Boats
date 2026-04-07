package main.java.com.user.dto;

import com.user.model.UserRole;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String community;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.community = user.getCommunity();
    }
    // getters y setters
}