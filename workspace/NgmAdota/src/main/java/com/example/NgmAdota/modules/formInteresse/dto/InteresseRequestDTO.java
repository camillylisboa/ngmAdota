package com.example.NgmAdota.modules.formInteresse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InteresseRequestDTO(Long id, @NotNull Integer usuarioId, @NotNull Long animalId , @NotBlank String temCrianca,
                                  @NotBlank String acordoAdocao, @NotBlank String presente,
                                  @NotBlank String moradia, @NotBlank String tipoCasa,
                                  @NotBlank String moradiaAberta, @NotBlank String temTelas,
                                  boolean cachorro, boolean gato,
                                  boolean outro, boolean primeiroPet, boolean declaracaoCheckbox) {
}
