package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.exceptions.AnimalFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.dto.RequestAnimalDTO;
import com.example.NgmAdota.modules.ong.services.CreateAnimalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/animal")
public class AnimalController {

    @Autowired
    AnimalRepository animalRepository;
    @Autowired
    private CreateAnimalService createAnimalService;

    @PostMapping("/")
        public ResponseEntity createAnimal(@Valid @RequestBody RequestAnimalDTO animalDTO){
            try{
                var createAnimal = createAnimalService.execute(animalDTO);
                return new ResponseEntity(createAnimal, HttpStatus.CREATED);
            }catch (AnimalFoundException e){
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

