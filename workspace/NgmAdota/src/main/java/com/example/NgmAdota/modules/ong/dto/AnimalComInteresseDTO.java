package com.example.NgmAdota.modules.ong.dto;

import com.example.NgmAdota.modules.ong.AnimalModel;

public class AnimalComInteresseDTO {
    private Long id;
    private String nome;
    private String imagem;
    private String statusAnimal;
    private int quantidadeInteressados;

    public AnimalComInteresseDTO(AnimalModel animal, int quantidadeInteressados) {
        this.id = animal.getId();
        this.nome = animal.getNome();
        this.imagem = animal.getImagem();
        this.statusAnimal = animal.getStatusAnimal().getTipo();
        this.quantidadeInteressados = quantidadeInteressados;
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

    public String getStatusAnimal() {
        return statusAnimal;
    }

    public void setStatusAnimal(String statusAnimal) {
        this.statusAnimal = statusAnimal;
    }

    public int getQuantidadeInteressados() {
        return quantidadeInteressados;
    }

    public void setQuantidadeInteressados(int quantidadeInteressados) {
        this.quantidadeInteressados = quantidadeInteressados;
    }
}
