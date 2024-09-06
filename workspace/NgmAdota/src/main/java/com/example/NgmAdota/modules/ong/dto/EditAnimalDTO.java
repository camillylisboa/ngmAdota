package com.example.NgmAdota.modules.ong.dto;

import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.StatusAnimalModel;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EditAnimalDTO(String nome,
                            String imagem,
                            BigDecimal peso,
                            LocalDate dataNascimento,
                            String sexo,
                            OngModel ongModel,
                            Long ongId,
                            String descricao,
                            Integer idRaca,
                            Integer idEspecie,
                            Integer idPelagem,
                            Integer idPorte,
                            StatusAnimalModel statusAnimal) {
}
