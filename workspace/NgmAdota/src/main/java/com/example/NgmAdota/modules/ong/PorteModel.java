package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sisPorte")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PorteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    // Construtor personalizado que aceita um ID
    public PorteModel(Long id) {
        this.id = id;
    }

}
