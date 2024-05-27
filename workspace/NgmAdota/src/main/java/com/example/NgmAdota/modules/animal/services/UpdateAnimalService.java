package com.example.NgmAdota.modules.animal.services;

import com.example.NgmAdota.exceptions.AnimalNotFoundException;
import com.example.NgmAdota.modules.animal.AnimalModel;
import com.example.NgmAdota.modules.animal.AnimalRepository;
import com.example.NgmAdota.modules.animal.dto.ResponseAnimalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@Service
public class UpdateAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public ResponseAnimalDTO execute(Long id, AnimalModel animal) {
        Optional<AnimalModel> animalEdit = animalRepository.findById(id);
        if (animalEdit.isEmpty()) {
            throw new AnimalNotFoundException();
        }

        AnimalModel existingAnimal = animalEdit.get();

        // Atualizando os campos do animal existente
        existingAnimal.setNome(animal.getNome());
        existingAnimal.setImagem(animal.getImagem());
        existingAnimal.setPeso(animal.getPeso());
        existingAnimal.setDataNascimento(animal.getDataNascimento());
        existingAnimal.setSexo(animal.getSexo());
        existingAnimal.setDescricao(animal.getDescricao());
        existingAnimal.setIdRaca(animal.getIdRaca());
        existingAnimal.setIdEspecie(animal.getIdEspecie());
        existingAnimal.setIdPelagem(animal.getIdPelagem());
        existingAnimal.setIdPorte(animal.getIdPorte());

        // Salvando o animal atualizado
        animalRepository.save(existingAnimal);

        int idade = Period.between(existingAnimal.getDataNascimento(), LocalDate.now()).getYears();

        // Construindo e retornando o ResponseAnimalDTO
        return ResponseAnimalDTO.builder()
                .nome(existingAnimal.getNome())
                .Imagem(existingAnimal.getImagem())
                .peso(existingAnimal.getPeso())
                .idade(existingAnimal.getIdade())
                .Descricao(existingAnimal.getDescricao())
                .build();
    }
}