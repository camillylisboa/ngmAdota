package com.example.NgmAdota.modules.formInteresse.controller;

import com.example.NgmAdota.modules.formInteresse.InteresseModel;
import com.example.NgmAdota.modules.formInteresse.InteresseRepository;
import com.example.NgmAdota.modules.formInteresse.dto.InteresseRequestDTO;
import com.example.NgmAdota.modules.formInteresse.services.InteresseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/interesse")
public class InteresseController {

    @Autowired
    InteresseRepository interesseRepository;

    @Autowired
    InteresseService interesseService;

    @Autowired
    private InteresseService service;

    @PostMapping("/cadastro")
    public ResponseEntity<InteresseModel> cadastroInteresse(@RequestBody @Valid InteresseRequestDTO request) {
        var interesseModel = new InteresseModel();
        BeanUtils.copyProperties(request, interesseModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(interesseRepository.save(interesseModel));
    }


    @GetMapping("/lista")
    public ResponseEntity<List<InteresseModel>> ListarInteresse() {
        return ResponseEntity.status(HttpStatus.OK).body(interesseRepository.findAll());
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<Object> listaInteresseAnimais(@PathVariable(value = "animalId") Long animalId){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(interesseService.getInteressesByAnimalId(animalId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
