package com.example.NgmAdota.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InteresseRequestDTO(Long id, @NotBlank String temCrianca, @NotBlank String acordoAdocao,
                                  @NotBlank String presente,
                                  @NotBlank String moradia, @NotBlank String tipoCasa,
                                  @NotBlank String moradiaAberta, @NotBlank String temTelas,
                                  @NotNull Pets pets) {

    public static class Pets {
        private final boolean cachorro;
        private final boolean gato;
        private final boolean outro;

        public Pets(boolean cachorro, boolean gato, boolean outro) {
            this.cachorro = cachorro;
            this.gato = gato;
            this.outro = outro;
        }

        public boolean isCachorro() {
            return cachorro;
        }

        public boolean isGato() {
            return gato;
        }

        public boolean isOutro() {
            return outro;
        }
    }
}
