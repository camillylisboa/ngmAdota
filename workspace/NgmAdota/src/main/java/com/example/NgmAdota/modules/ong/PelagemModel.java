package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sisPelagem")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PelagemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    // Construtor personalizado que aceita um ID
    public PelagemModel(Long id) {
        this.id = id;
    }
}
