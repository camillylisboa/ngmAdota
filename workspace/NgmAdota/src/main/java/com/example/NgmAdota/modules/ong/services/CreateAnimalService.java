package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.AnimalFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.dto.RequestAnimalDTO;
import com.example.NgmAdota.modules.ong.dto.ResponseAnimalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.time.Period;

@Service
public class CreateAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public ResponseAnimalDTO execute(@Valid RequestAnimalDTO animalDTO) {
        // Verificar se o animal já existe (opcional)
        animalRepository.findByNomeAndImagemAndDataNascimentoAndDescricao(
                animalDTO.nome(),
                animalDTO.imagem(),
                animalDTO.dataNascimento(),
                animalDTO.descricao()
        ).ifPresent(animal -> {
            throw new AnimalFoundException("Animal já existe em nossa base de dados");
        });

        // Converter DTO para Entidade
        AnimalModel animal = convertToEntity(animalDTO);

        // Salvar a entidade
        AnimalModel savedAnimal = animalRepository.save(animal);

        // Converter Entidade para DTO de Resposta
        return convertToResponseDTO(savedAnimal);
    }

    private AnimalModel convertToEntity(RequestAnimalDTO animalDTO) {
        AnimalModel animal = new AnimalModel();
        animal.setNome(animalDTO.nome());
        animal.setImagem(animalDTO.imagem());
        animal.setDataNascimento(animalDTO.dataNascimento());
        animal.setPeso(animalDTO.peso());
        animal.setIdade(animal.getIdade());
        animal.setSexo(animalDTO.sexo());
        animal.setDescricao(animalDTO.descricao());
        animal.setIdRaca(animalDTO.idRaca());
        animal.setIdEspecie(animalDTO.idEspecie());
        animal.setIdPelagem(animalDTO.idPelagem());
        animal.setIdPorte(animalDTO.idPorte());
        return animal;
    }

    private ResponseAnimalDTO convertToResponseDTO(AnimalModel animal) {
        int idade = Period.between(animal.getDataNascimento(), LocalDate.now()).getYears();
        return ResponseAnimalDTO.builder()
                .id(animal.getId())
                .nome(animal.getNome())
                .imagem(animal.getImagem())
                .descricao(animal.getDescricao())
                .sexo(animal.getSexo())
                .idade(idade)
                .peso(animal.getPeso())
                .build();
    }
}
