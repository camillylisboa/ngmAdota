package com.example.NgmAdota.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "tabInteresse")
public class InteresseModel {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private UsuarioModel usuario;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    public String getTemCrianca() {
        return temCrianca;
    }

    public void setTemCrianca(String temCrianca) {
        this.temCrianca = temCrianca;
    }

    public String getAcordoAdocao() {
        return acordoAdocao;
    }

    public void setAcordoAdocao(String acordoAdocao) {
        this.acordoAdocao = acordoAdocao;
    }

    public String getPresente() {
        return presente;
    }

    public void setPresente(String presente) {
        this.presente = presente;
    }

    public String getMoradia() {
        return moradia;
    }

    public void setMoradia(String moradia) {
        this.moradia = moradia;
    }

    public String getTipoCasa() {
        return tipoCasa;
    }

    public void setTipoCasa(String tipoCasa) {
        this.tipoCasa = tipoCasa;
    }

    public String getMoradiaAberta() {
        return moradiaAberta;
    }

    public void setMoradiaAberta(String moradiaAberta) {
        this.moradiaAberta = moradiaAberta;
    }

    public String getTemTelas() {
        return temTelas;
    }

    public void setTemTelas(String temTelas) {
        this.temTelas = temTelas;
    }

    public boolean isCachorro() {
        return cachorro;
    }

    public void setCachorro(boolean cachorro) {
        this.cachorro = cachorro;
    }

    public boolean isGato() {
        return gato;
    }

    public void setGato(boolean gato) {
        this.gato = gato;
    }

    public boolean isOutro() {
        return outro;
    }

    public void setOutro(boolean outro) {
        this.outro = outro;
    }

    public boolean isPrimeiroPet() {
        return primeiroPet;
    }

    public void setPrimeiroPet(boolean primeiroPet) {
        this.primeiroPet = primeiroPet;
    }
}
