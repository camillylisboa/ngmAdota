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
    private InteresseService service;

    @PostMapping("/")
    public InteresseModel createInteresse(@Valid @RequestBody InteresseRequestDTO requestDTO, HttpServletRequest request){
        Integer usuarioId = (Integer) request.getAttribute("usuario_id");
        Long animalId = (Long) request.getAttribute("animal_id");
        var interesseModel = InteresseModel.builder()
                .usuarioId(usuarioId)
                .animalId(animalId)
                .temCrianca(requestDTO.temCrianca())
                .acordoAdocao(requestDTO.acordoAdocao())
                .presente(requestDTO.presente())
                .moradia(requestDTO.moradia())
                .tipoCasa(requestDTO.tipoCasa())
                .moradiaAberta(requestDTO.moradiaAberta())
                .temTelas(requestDTO.temTelas())
                .cachorro(requestDTO.cachorro())
                .gato(requestDTO.gato())
                .outro(requestDTO.outro())
                .primeiroPet(requestDTO.primeiroPet())
                .declaracaoCheckbox(requestDTO.declaracaoCheckbox())
                .build();
        return this.service.execute(interesseModel);

    }

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
