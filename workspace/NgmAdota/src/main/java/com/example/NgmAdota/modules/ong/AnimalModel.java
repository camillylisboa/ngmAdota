package com.example.NgmAdota.modules.ong;

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

    private Integer idRaca;
    private Integer idEspecie;
    private Integer idPelagem;
    private Integer idPorte;

    @ManyToOne()
    @JoinColumn(name = "statusanimal_id")
    private StatusAnimalModel statusAnimal;

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
