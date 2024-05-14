package com.example.NgmAdota.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;

public record AnimalRequestDTO(@NotBlank String nome, @NotBlank String imagem, @NotNull BigDecimal peso,
                               @NotNull Date dataNascimento, @NotNull Boolean sexo,
                               @NotNull Integer idRaca, @NotNull Integer idEspecie, @NotNull Integer idPelagem,
                               @NotNull Integer idPorte) {
}
