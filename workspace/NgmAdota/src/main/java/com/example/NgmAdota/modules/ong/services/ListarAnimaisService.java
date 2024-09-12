package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.FavoritoRepository;
import com.example.NgmAdota.modules.ong.dto.AnimalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListarAnimaisService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private FavoritoRepository favoritoRepository;

    public List<AnimalDTO> listarAnimais(Long usuarioId) {
        // Busca todos os animais
        List<AnimalModel> animais = animalRepository.findAll();

        // Converte a lista de AnimalModel para AnimalDTO, verificando se cada animal é favorito
        return animais.stream().map(animal -> {
            boolean isFavorito = favoritoRepository.existsByUsuarioIdAndAnimalId(usuarioId, animal.getId());

            return new AnimalDTO(
                    animal.getId(),
                    animal.getNome(),
                    animal.getImagem(),
                    animal.getPeso(),
                    animal.getIdade(),
                    animal.getSexo(),
                    animal.getOngId(),
                    animal.getDescricao(),
                    animal.getRacaAnimal(),
                    animal.getEspecieAnimal(),
                    animal.getPelagemAnimal(),
                    animal.getPorteAnimal(),
                    animal.getStatusAnimal(),
                    isFavorito // Verifica se é favorito
            );
        }).collect(Collectors.toList());
    }
}

