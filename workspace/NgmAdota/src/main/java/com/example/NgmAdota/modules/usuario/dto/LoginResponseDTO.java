package com.example.NgmAdota.modules.usuario.dto;

import java.time.LocalDate;

public record LoginResponseDTO(Long Id, String nome, String email, Long telefone, Integer idade, String token) {
}
