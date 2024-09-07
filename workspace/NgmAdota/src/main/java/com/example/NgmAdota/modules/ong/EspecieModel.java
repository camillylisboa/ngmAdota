package com.example.NgmAdota.modules.ong;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sisEspecie")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EspecieModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    public EspecieModel(Long id) {
        this.id = id;
    }
}
