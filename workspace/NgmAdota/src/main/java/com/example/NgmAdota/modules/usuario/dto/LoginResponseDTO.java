package com.example.NgmAdota.modules.usuario.dto;


import com.example.NgmAdota.modules.usuario.services.UserRole;

import java.time.LocalDate;

public record LoginResponseDTO(Integer id, String nome, String email, Long telefone, Integer idade, LocalDate dataNascimento, String cep, String uf, String cidade, String bairro, String logradouro, Integer numero, String complemento, Long ongId, UserRole role, String token) {
}
