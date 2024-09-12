package com.example.NgmAdota.modules.ong;

import com.example.NgmAdota.modules.usuario.UsuarioModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tabAnimal")
@Data
@Builder
@AllArgsConstructor
public class AnimalModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String imagem;
    private BigDecimal peso;
    @NotNull
    private LocalDate dataNascimento;
    private String sexo;

    @ManyToOne()
    @JoinColumn(name = "ong_id", insertable = false, updatable = false)
    private OngModel ongModel;

    @Column(name = "ong_id", nullable = false)
    private Long ongId;

    @Lob
    private String descricao;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "racaanimal_id")
    private RacaModel racaAnimal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "especieanimal_Id")
    private EspecieModel especieAnimal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pelagemanimal_id")
    private PelagemModel pelagemAnimal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "porteanimal_id")
    private PorteModel porteAnimal;

    @ManyToOne()
    @JoinColumn(name = "statusanimal_id")
    private StatusAnimalModel statusAnimal;

    private boolean favorito;

    @ManyToMany(mappedBy = "favoritos")
    private Set<UsuarioModel> usuariosFavoritaram = new HashSet<>();

    public AnimalModel() {
    }

    public AnimalModel(Long id) {
        this.id = id;
    }

//    public String getIdade() {
//        if (dataNascimento == null) {
//            return "0"; // ou qualquer valor padrão que faça sentido
//        }
//        LocalDate hoje = LocalDate.now();
//        String data = String.valueOf(Period.between(this.dataNascimento, hoje).getYears()) + " ano(s)";
//        if (data.equals("0 ano(s)")) {
//            data = (Period.between(this.dataNascimento, hoje).getMonths()) + " mês(es)";
//        }
//        return data;
//    }

    public String getIdade() {
        if (dataNascimento == null) {
            return "0"; // ou qualquer valor padrão que faça sentido
        }

        LocalDate hoje = LocalDate.now();
        Period periodo = Period.between(this.dataNascimento, hoje);
        int anos = periodo.getYears();
        int meses = periodo.getMonths();

        return anos > 0 ? anos + " ano(s)" : meses + " mês(es)";  // "?" significa que é o if       ":" significa else
    }

    public void setIdade(String idade) {
    }
}
