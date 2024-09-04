package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.StatusAnimalModel;
import com.example.NgmAdota.modules.ong.StatusAnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StatusAnimalService {

    @Autowired
    private StatusAnimalRepository statusAnimalRepository;

    public List<StatusAnimalModel> getAllStatusAnimal() {
        try {
            return statusAnimalRepository.findByOrderByTipoAsc();
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Erro ao buscar todos os status", e);
        }
    }
}
