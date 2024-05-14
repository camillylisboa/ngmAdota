package com.example.NgmAdota.Controllers;

import com.example.NgmAdota.Dtos.AnimalRequestDTO;
import com.example.NgmAdota.Models.AnimalModel;
import com.example.NgmAdota.Repositories.AnimalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/animal")
public class AnimalController {

    @Autowired
    AnimalRepository animalRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<AnimalModel> cadastroAnimal(@RequestBody @Valid AnimalRequestDTO request) {
        var animalModel = new AnimalModel();
        BeanUtils.copyProperties(request, animalModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(animalRepository.save(animalModel));
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

    @PutMapping("/editar/{id}")
    public ResponseEntity<Object> editarAnimal(@PathVariable(value = "id") Long id,
                                               @RequestBody @Valid AnimalRequestDTO request){
        Optional<AnimalModel> animalO = animalRepository.findById(id);
        if (animalO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel editar os dados deste animal, pois ele não foi encontrado");
        }
        var animalModel = animalO.get();
        BeanUtils.copyProperties(request, animalModel);
        return ResponseEntity.status(HttpStatus.OK).body(animalRepository.save(animalModel));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Object> deletarAnimal(@PathVariable(value = "id") Long id){
        Optional<AnimalModel> animalO = animalRepository.findById(id);
        if (animalO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel deletar este animal, pois ele não foi encontrado");
        }
        animalRepository.delete(animalO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Animal deletado com sucesso!");
    }
}
