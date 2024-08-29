package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;

import com.example.NgmAdota.modules.ong.services.CreateAnimalService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/animal")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private CreateAnimalService createAnimalService;
    @Value("${upload.path}")
    private String uploadPath; // Propriedade para o caminho da pasta de uploads

    @PostMapping("/")
    public ResponseEntity createAnimal(
            @RequestPart("animal") @Valid AnimalModel animalModel,
            @RequestPart("file") MultipartFile file) {
        try {
            var newAnimal = createAnimalService.execute(animalModel, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAnimal);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }


    @GetMapping("/lista")
    public ResponseEntity<List<AnimalModel>> listarAnimais() {
        return ResponseEntity.status(HttpStatus.OK).body(animalRepository.findAll());
    }

    @GetMapping("/lista/{id}")
    public ResponseEntity<Object> listarUmAnimal(@PathVariable(value = "id") Long id) {
        Optional<AnimalModel> animalO = animalRepository.findById(id);
        if (animalO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado no sistema");
        }
        return ResponseEntity.status(HttpStatus.OK).body(animalO.get());
    }






    @PostMapping("/uploadimage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Arquivo não encontrado");
        }

        try {
            // Salva o arquivo usando o caminho especificado
            String originalFilename = file.getOriginalFilename();
            Path fileStorageLocation = Paths.get(uploadPath, originalFilename);

            // Cria o diretório se não existir
            Files.createDirectories(fileStorageLocation.getParent());

            // Salva o arquivo
            Files.copy(file.getInputStream(), fileStorageLocation);

            return ResponseEntity.status(HttpStatus.OK).body("Arquivo enviado com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao enviar o arquivo");
        }
    }
}

