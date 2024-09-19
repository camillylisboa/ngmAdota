package com.example.NgmAdota.modules.ong.dto;

import com.example.NgmAdota.modules.ong.OngModel;

import java.util.List;

public class OngComAnimaisDTO {
    private Long id;
    private String razaosocial;
    private String email;
    private List<AnimalComInteresseDTO> animais;

    public OngComAnimaisDTO(OngModel ong, List<AnimalComInteresseDTO> animais) {
        this.id = ong.getId();
        this.razaosocial = ong.getRazaosocial();
        this.email = ong.getEmail();
        this.animais = animais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazaosocial() {
        return razaosocial;
    }

    public void setRazaosocial(String razaosocial) {
        this.razaosocial = razaosocial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<AnimalComInteresseDTO> getAnimais() {
        return animais;
    }

    public void setAnimais(List<AnimalComInteresseDTO> animais) {
        this.animais = animais;
    }
}
