package com.example.NgmAdota.Dtos;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(@NotBlank String email,@NotBlank String senha) {
}
