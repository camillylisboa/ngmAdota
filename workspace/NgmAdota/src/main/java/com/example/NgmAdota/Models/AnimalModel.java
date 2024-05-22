package com.example.NgmAdota.Models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tabAnimal")
public class AnimalModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private String Nome;
    private String Imagem;
    private BigDecimal Peso;
    private Date DataNascimento;
    private Boolean Sexo;
    @Lob
    private String descricao;
    private Integer IdRaca;
    private Integer IdEspecie;
    private Integer IdPelagem;
    private Integer IdPorte;

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getNome() {
        return Nome;
    }

    public void setNome(String nome) {
        Nome = nome;
    }

    public String getImagem() {
        return Imagem;
    }

    public void setImagem(String imagem) {
        Imagem = imagem;
    }

    public BigDecimal getPeso() {
        return Peso;
    }

    public void setPeso(BigDecimal peso) {
        Peso = peso;
    }

    public Date getDataNascimento() {
        return DataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        DataNascimento = dataNascimento;
    }

    public Boolean getSexo() {
        return Sexo;
    }

    public void setSexo(Boolean sexo) {
        Sexo = sexo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getIdRaca() {
        return IdRaca;
    }

    public void setIdRaca(Integer idRaca) {
        IdRaca = idRaca;
    }

    public Integer getIdEspecie() {
        return IdEspecie;
    }

    public void setIdEspecie(Integer idEspecie) {
        IdEspecie = idEspecie;
    }

    public Integer getIdPelagem() {
        return IdPelagem;
    }

    public void setIdPelagem(Integer idPelagem) {
        IdPelagem = idPelagem;
    }

    public Integer getIdPorte() {
        return IdPorte;
    }

    public void setIdPorte(Integer idPorte) {
        IdPorte = idPorte;
    }
}
