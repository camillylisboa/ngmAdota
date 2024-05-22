package com.example.NgmAdota.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AnimalRequestDTO(@NotBlank String nome, @NotBlank String imagem, @NotNull BigDecimal peso,
                               @NotNull LocalDate dataNascimento, @NotBlank String descricao, @NotNull Boolean sexo,
                               @NotNull Integer idRaca, @NotNull Integer idEspecie, @NotNull Integer idPelagem,
                               @NotNull Integer idPorte) {
}
