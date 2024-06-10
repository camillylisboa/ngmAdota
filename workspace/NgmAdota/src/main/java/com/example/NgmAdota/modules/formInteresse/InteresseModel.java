package com.example.NgmAdota.modules.formInteresse;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tabInteresse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InteresseModel {
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(cascade = CascadeType.PERSIST)
        @JoinColumn(name = "usuario_id", nullable = false)
        private UsuarioModel usuario;

        @OneToOne
        @JoinColumn(name = "animal_id", referencedColumnName = "id")
        private AnimalModel animal;

        private String temCrianca;
        private String acordoAdocao;
        private String presente;
        private String moradia;
        private String tipoCasa;
        private String moradiaAberta;
        private String temTelas;
        private boolean cachorro;
        private boolean gato;
        private boolean outro;
        private boolean primeiroPet;
        private boolean declaracaoCheckbox;
}
