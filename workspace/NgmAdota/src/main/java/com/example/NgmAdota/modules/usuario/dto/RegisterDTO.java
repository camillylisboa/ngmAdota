package com.example.NgmAdota.modules.usuario.dto;

import com.example.NgmAdota.modules.usuario.services.UserRole;

import java.time.LocalDate;

public record RegisterDTO(String nome, String email, LocalDate dataNascimento, Long telefone, String senha, UserRole role, Long ongId, String cep, String uf, String cidade, String bairro, String logradouro, Integer numero, String complemento) {
}
