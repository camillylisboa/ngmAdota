package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.AnimalNotFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.FavoritoModel;
import com.example.NgmAdota.modules.ong.FavoritoRepository;
import com.example.NgmAdota.modules.ong.dto.EditAnimalDTO;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class EditAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private FavoritoRepository favoritoRepository;

    public AnimalModel edit(Long id, EditAnimalDTO editDTO, MultipartFile file, String uploadPath) {
        return animalRepository.findById(id)
                .map(animal -> {
                    // Atualizar as informações básicas do animal
                    animal.setNome(editDTO.nome());
                    animal.setPeso(editDTO.peso());
                    animal.setDataNascimento(editDTO.dataNascimento());
                    animal.setSexo(editDTO.sexo());
                    animal.setDescricao(editDTO.descricao());
                    animal.setRacaAnimal(editDTO.racaAnimal());
                    animal.setEspecieAnimal(editDTO.especieAnimal());
                    animal.setPelagemAnimal(editDTO.pelagemAnimal());
                    animal.setPorteAnimal(editDTO.porteAnimal());
                    animal.setStatusAnimal(editDTO.statusAnimal());

                    // Processar o upload da imagem com controle de sobrescrita
                    if (file != null && !file.isEmpty()) {
                        try {
                            // Salva o arquivo usando o caminho especificado
                            String originalFilename = file.getOriginalFilename();
                            Path fileStorageLocation = Paths.get(uploadPath, originalFilename);

                            // Cria o diretório se não existir
                            Files.createDirectories(fileStorageLocation.getParent());

                            // Evitar sobrescrita de arquivos
                            Path targetLocation = fileStorageLocation;
                            int i = 1;
                            while (Files.exists(targetLocation)) {
                                String newFilename = originalFilename.substring(0, originalFilename.lastIndexOf('.'))
                                        + "_" + i + originalFilename.substring(originalFilename.lastIndexOf('.'));
                                targetLocation = Paths.get(uploadPath, newFilename);
                                i++;
                            }

                            // Salva o arquivo
                            Files.copy(file.getInputStream(), targetLocation);

                            // Atualiza o caminho da imagem no modelo para o caminho relativo
                            String relativePath = "/uploads/" + targetLocation.getFileName().toString();
                            animal.setImagem(relativePath);

                        } catch (IOException e) {
                            throw new RuntimeException("Erro ao salvar o arquivo de imagem: " + e.getMessage());
                        }
                    }
                    System.out.println("Não entrou");
                    // Salva o animal atualizado no banco de dados
                    return animalRepository.save(animal);
                })
                .orElseThrow(() -> new AnimalNotFoundException("Animal não encontrado"));
    }

    public List<AnimalModel> findAnimalsByStatusId(Long statusAnimalId) {
        return animalRepository.findByStatusAnimalId(statusAnimalId);
    }

    public List<FavoritoModel> findByUsuarioId(Long usuario) {
        return favoritoRepository.findByUsuarioId(usuario);
    }


}
