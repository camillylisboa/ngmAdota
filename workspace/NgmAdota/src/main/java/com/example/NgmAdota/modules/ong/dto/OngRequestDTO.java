package com.example.NgmAdota.modules.ong.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OngRequestDTO(@NotBlank String razaosocial, @NotBlank String email, @NotBlank String cnpj,
                            @NotBlank String telefone,
                            @NotBlank String cep, @NotBlank String estado,
                            @NotBlank String cidade, @NotBlank String bairro, @NotBlank String logradouro,
                            @NotNull Integer numero, String complemento) {
}