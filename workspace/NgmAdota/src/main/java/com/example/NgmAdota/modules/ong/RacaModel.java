package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sisRaca")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RacaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "especieAnimal_id")
    private EspecieModel especieAnimal;

    private String tipo;

    // Construtor personalizado que aceita um ID
    public RacaModel(Long id) {
        this.id = id;
    }
}
