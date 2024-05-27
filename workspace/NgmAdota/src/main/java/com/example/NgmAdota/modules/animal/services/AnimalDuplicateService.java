package com.example.NgmAdota.modules.animal.services;

import com.example.NgmAdota.modules.animal.AnimalModel;
import com.example.NgmAdota.modules.animal.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AnimalDuplicateService {

    @Autowired
    private AnimalRepository animalRepository;

    public boolean isAnimalDuplicado(String nome, String imagem, LocalDate dataNascimento, String descricao) {
        Optional<AnimalModel> animal = animalRepository.findByNomeAndImagemAndDataNascimentoAndDescricao(
                nome, imagem, dataNascimento, descricao
        );
        return animal.isPresent();
    }
}
