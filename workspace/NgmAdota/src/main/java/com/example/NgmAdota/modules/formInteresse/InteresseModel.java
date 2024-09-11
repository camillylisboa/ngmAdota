package com.example.NgmAdota.modules.formInteresse;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tabInteresse")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InteresseModel {
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne()
        @JoinColumn(name = "usuario_id", insertable = false, updatable = false)
        private UsuarioModel usuarioModel;

        @Column(name = "usuario_id", nullable = false)
        private Integer usuarioId;

        @ManyToOne()
        @JoinColumn(name = "animal_id", insertable = false, updatable = false)
        private AnimalModel animalModel;

        @Column(name = "animal_id", nullable = false)
        private Long animalId;

        private String temCrianca;
        private String acordoAdocao;
        private String moradia;
        private String tipoCasa;
        private String temQuintal;
        private String temTelas;
        private String autorizacaoProprietario;
        private boolean cachorro;
        private boolean gato;
        private boolean outro;
        private boolean primeiroPet;
        private boolean declaracaoCheckbox;
}
