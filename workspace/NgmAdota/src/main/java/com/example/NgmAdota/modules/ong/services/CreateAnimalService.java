package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.AnimalFoundException;
import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.OngRepository;
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

    @Autowired
    private OngRepository ongRepository;

    public AnimalModel execute(@Valid AnimalModel animalModel) {
        // Verificar se o animal já existe (opcional)
        animalRepository.findByNomeAndImagemAndDataNascimentoAndDescricao(
                animalModel.getNome(),
                animalModel.getImagem(),
                animalModel.getDataNascimento(),
                animalModel.getDescricao()
        ).ifPresent(animal -> {
            throw new AnimalFoundException("Animal já existe em nossa base de dados");
        });
        if(this.ongRepository.findById(animalModel.getOngId()).isPresent()){
            return this.animalRepository.save(animalModel);
        }
        throw new OngNotFoundException();
    }
}
