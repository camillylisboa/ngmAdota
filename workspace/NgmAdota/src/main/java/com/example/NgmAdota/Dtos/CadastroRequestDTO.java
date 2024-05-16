package com.example.NgmAdota.Dtos;

import java.time.LocalDate;

public record CadastroRequestDTO(String nome, String email, LocalDate dataNascimento, Long telefone, String senha) {
}
