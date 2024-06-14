package com.example.NgmAdota.modules.ong.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ResponseAnimalDTO (Long id, String nome, String imagem, String descricao, String sexo, int idade, BigDecimal peso){

}
