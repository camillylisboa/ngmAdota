package com.example.NgmAdota.Service;

import com.example.NgmAdota.Models.AnimalModel;
import com.example.NgmAdota.Repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public boolean isAnimalDuplicado(String nome, LocalDate dataNascimento, Integer idRaca, Integer idEspecie) {
        Optional<AnimalModel> animal = animalRepository.findByNomeAndDataNascimentoAndIdRacaAndIdEspecie(
                nome, dataNascimento, idRaca, idEspecie
        );
        return animal.isPresent();
    }
}
