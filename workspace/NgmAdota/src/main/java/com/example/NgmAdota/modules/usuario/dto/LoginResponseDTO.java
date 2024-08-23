package com.example.NgmAdota.modules.usuario.dto;


import com.example.NgmAdota.modules.usuario.services.UserRole;

public record LoginResponseDTO(Integer id, String nome, String email, Long telefone, Integer idade, Long ongId, UserRole role, String token) {
}
