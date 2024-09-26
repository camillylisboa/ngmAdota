package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.formInteresse.InteresseRepository;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.dto.AnimalComInteresseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAnimalsOngService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private InteresseRepository interesseRepository;

    public List<AnimalComInteresseDTO> getAnimalsOng(Long ongId) {
        List<AnimalModel> animais = animalRepository.findByOngId(ongId); // Método para pegar animais da ONG

        // Para cada animal, conte o número de interessados e retorne uma lista de DTOs
        return animais.stream()
                .map(animal -> {
                    int quantidadeInteressados = interesseRepository.countByAnimalId(animal.getId());
                    return new AnimalComInteresseDTO(animal, quantidadeInteressados);
                })
                .collect(Collectors.toList());
    }

    public List<AnimalComInteresseDTO> getAnimalsNome(String nome) {
        List<AnimalModel> animais = animalRepository.findByNomeContainingIgnoreCase(nome);

        // Para cada animal, conte o número de interessados e retorne uma lista de DTOs
        return animais.stream()
                .map(animal -> {
                    int quantidadeInteressados = interesseRepository.countByAnimalId(animal.getId());
                    return new AnimalComInteresseDTO(animal, quantidadeInteressados);
                })
                .collect(Collectors.toList());
    }
}
