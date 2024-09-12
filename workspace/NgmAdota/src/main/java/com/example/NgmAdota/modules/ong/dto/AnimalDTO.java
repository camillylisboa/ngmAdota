package com.example.NgmAdota.modules.ong.dto;

import com.example.NgmAdota.modules.ong.RacaModel;
import com.example.NgmAdota.modules.ong.EspecieModel;
import com.example.NgmAdota.modules.ong.PelagemModel;
import com.example.NgmAdota.modules.ong.PorteModel;
import com.example.NgmAdota.modules.ong.StatusAnimalModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class AnimalDTO {
    private Long id;
    private String nome;
    private String imagem;
    private BigDecimal peso;
    private String idade; // Gerada pelo método getIdade()
    private String sexo;
    private Long ongId;
    private String descricao;
    private RacaModel racaAnimal;
    private EspecieModel especieAnimal;
    private PelagemModel pelagemAnimal;
    private PorteModel porteAnimal;
    private StatusAnimalModel statusAnimal;
    private boolean favorito; // Campo para indicar se o animal é favorito
}
