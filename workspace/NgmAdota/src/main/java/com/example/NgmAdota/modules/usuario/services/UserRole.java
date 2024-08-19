package com.example.NgmAdota.modules.usuario.services;

public enum UserRole {
    ADMIN("admin"),
    ONG("ong"),
    USER("user");

    private final String role;
    UserRole(String role){
        this.role = role;
    }
    public String getRole(){
        return role;
    }
}
