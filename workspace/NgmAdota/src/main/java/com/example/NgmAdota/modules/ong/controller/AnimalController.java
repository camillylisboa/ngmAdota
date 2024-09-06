package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;

import com.example.NgmAdota.modules.ong.dto.EditAnimalDTO;
import com.example.NgmAdota.modules.ong.services.CreateAnimalService;

import com.example.NgmAdota.modules.ong.services.EditAnimalService;
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
    @Autowired
    private EditAnimalService editAnimalService;
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

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editAnimal(
            @PathVariable(value = "id") Long id,
            @RequestPart("animal") @Valid EditAnimalDTO editDTO,
            @RequestPart("file") MultipartFile file) {
        try {
            var editAnimal = editAnimalService.edit(id, editDTO, file, "/Workspace/ProjectNgmAdota/ngmAdota/uploads"); // Passa o caminho para upload
            return ResponseEntity.status(HttpStatus.OK).body(editAnimal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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


}

