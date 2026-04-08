package com.user.dto;

import com.user.model.User;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String community;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.community = user.getCommunity();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getCommunity() { return community; }
}