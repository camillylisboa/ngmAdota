package com.example.NgmAdota.modules.animal.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ResponseAnimalDTO (Long id, String nome, String Imagem, String Descricao, int idade, BigDecimal peso){

}
