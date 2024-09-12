package com.example.NgmAdota.modules.ong.dto;

import com.example.NgmAdota.modules.ong.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EditAnimalDTO(Long id,
                            String nome,
                            String imagem,
                            BigDecimal peso,
                            LocalDate dataNascimento,
                            String sexo,
                            String descricao,
                            RacaModel racaAnimal,
                            EspecieModel especieAnimal,
                            PelagemModel pelagemAnimal,
                            PorteModel porteAnimal,
                            StatusAnimalModel statusAnimal,
                            boolean favorito) {
}
