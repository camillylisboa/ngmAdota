package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "sisStatusanimal")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusAnimalModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo;

    // Construtor personalizado que aceita um ID
    public StatusAnimalModel(Long id) {
        this.id = id;
    }
}
