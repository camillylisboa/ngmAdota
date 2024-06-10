package com.example.NgmAdota.modules.formInteresse.controller;

import com.example.NgmAdota.modules.formInteresse.InteresseModel;
import com.example.NgmAdota.modules.formInteresse.InteresseRepository;
import com.example.NgmAdota.modules.formInteresse.dto.InteresseRequestDTO;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/interesse")
public class InteresseController {

    @Autowired
    InteresseRepository interesseRepository;

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
}
