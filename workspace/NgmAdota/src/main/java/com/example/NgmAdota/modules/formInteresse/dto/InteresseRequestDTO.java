package com.example.NgmAdota.modules.formInteresse.dto;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import jakarta.validation.constraints.NotBlank;

public record InteresseRequestDTO(Long id, UsuarioModel usuarioId, AnimalModel animalId , @NotBlank String temCrianca,
                                  @NotBlank String acordoAdocao, @NotBlank String presente,
                                  @NotBlank String moradia, @NotBlank String tipoCasa,
                                  @NotBlank String moradiaAberta, @NotBlank String temTelas,
                                  boolean cachorro, boolean gato,
                                  boolean outro, boolean primeiroPet, boolean declaracaoCheckbox) {
}
