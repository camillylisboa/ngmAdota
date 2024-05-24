package com.example.NgmAdota.Dtos;

import java.time.LocalDate;

public record ResponseUsuarioDTO(Long id, String nome, String email, Long telefone, LocalDate dataNascimento, Integer idade, String senha, String token) {
}
