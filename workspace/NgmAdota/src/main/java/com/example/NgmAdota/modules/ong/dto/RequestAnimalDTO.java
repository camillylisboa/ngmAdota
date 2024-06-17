package com.example.NgmAdota.modules.ong.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RequestAnimalDTO(String nome,
                               String imagem,
                               BigDecimal peso,
                               LocalDate dataNascimento,
                               String sexo,
                               String descricao,
                               Integer idRaca,
                               Integer idEspecie,
                               Integer idPelagem,
                               Integer idPorte) {
}
