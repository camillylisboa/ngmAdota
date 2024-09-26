package com.example.NgmAdota.modules.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tabFeedback")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comentario;

    @ManyToOne()
    @JoinColumn(name = "usuario_id", updatable = false,  insertable = false)
    private UsuarioModel usuarioModel;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    private Integer estrelas;

    @CreationTimestamp
    private LocalDateTime dataFeedback;
}
