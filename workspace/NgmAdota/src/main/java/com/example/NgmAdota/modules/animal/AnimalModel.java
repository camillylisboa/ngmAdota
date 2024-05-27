package com.example.NgmAdota.modules.animal;

import jakarta.persistence.*;
import lombok.Builder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;

@Entity
@Table(name = "tabAnimal")
@Builder
public class AnimalModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String imagem;
    private BigDecimal peso;
    private LocalDate dataNascimento;
    private Boolean sexo;
    @Lob
    private String descricao;
    private Integer idRaca;
    private Integer idEspecie;
    private Integer idPelagem;
    private Integer idPorte;

    public int getIdade() {
        if (dataNascimento == null) {
            return 0; // ou qualquer valor padrão que faça sentido
        }
        LocalDate hoje = LocalDate.now();
        return Period.between(this.dataNascimento, hoje).getYears();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public void setPeso(BigDecimal peso) {
        this.peso = peso;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Boolean getSexo() {
        return sexo;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getIdRaca() {
        return idRaca;
    }

    public void setIdRaca(Integer idRaca) {
        this.idRaca = idRaca;
    }

    public Integer getIdEspecie() {
        return idEspecie;
    }

    public void setIdEspecie(Integer idEspecie) {
        this.idEspecie = idEspecie;
    }

    public Integer getIdPelagem() {
        return idPelagem;
    }

    public void setIdPelagem(Integer idPelagem) {
        this.idPelagem = idPelagem;
    }

    public Integer getIdPorte() {
        return idPorte;
    }

    public void setIdPorte(Integer idPorte) {
        this.idPorte = idPorte;
    }
}
