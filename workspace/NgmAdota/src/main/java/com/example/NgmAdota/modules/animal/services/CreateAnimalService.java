package com.example.NgmAdota.modules.animal.services;

import com.example.NgmAdota.exceptions.AnimalFoundException;
import com.example.NgmAdota.modules.animal.AnimalModel;
import com.example.NgmAdota.modules.animal.AnimalRepository;
import com.example.NgmAdota.modules.animal.dto.ResponseAnimalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public AnimalModel execute(AnimalModel animal){
        this.animalRepository.findByNomeAndImagemAndDataNascimentoAndDescricao(animal.getNome(), animal.getImagem(), animal.getDataNascimento(), animal.getDescricao())
                .ifPresent((pet) -> {
                    throw new AnimalFoundException();
                });
        var animalDTO = ResponseAnimalDTO.builder()
                .id(animal.getId())
                .nome(animal.getNome())
                .idade(animal.getIdade())
                .Descricao(animal.getDescricao())
                .Imagem(animal.getImagem())
                .peso(animal.getPeso())
                .build();

        return this.animalRepository.save(animal);

    }
}
