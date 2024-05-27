package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.ong.dto.OngRequestDTO;
import com.example.NgmAdota.modules.ong.services.CreateOngService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/ong")
public class OngController {

    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private CreateOngService createOngService;

    @PostMapping("/")
    public ResponseEntity<Object> create(@Valid @RequestBody OngModel ong){
        try{
            var result = this.createOngService.execute(ong);
            return ResponseEntity.ok().body(result);
        }catch (UserFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/lista")
    public ResponseEntity<List<OngModel>> ListarOng() {
        return ResponseEntity.status(HttpStatus.OK).body(ongRepository.findAll());
    }

    @GetMapping("/lista/{id}")
    public ResponseEntity<Object> listarUmaOng(@PathVariable(value = "id")  Long id) {
        Optional<OngModel> ong0 = ongRepository.findById(id);
        if (ong0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel editar os dados desta Ong, pois ela não foi encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(ong0.get());
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Object> editarOng(@PathVariable(value = "id") Long id,
                                               @RequestBody @Valid OngRequestDTO request){
        Optional<OngModel> ong0 = ongRepository.findById(id);
        if (ong0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel editar os dados desta ong, pois ela não foi encontrada");
        }
        var ongModel = ong0.get();
        BeanUtils.copyProperties(request, ongModel);
        return ResponseEntity.status(HttpStatus.OK).body(ongRepository.save(ongModel));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Object> deletarOng(@PathVariable(value = "id") Long id){
        Optional<OngModel> ong0 = ongRepository.findById(id);
        if (ong0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel deletar esta Ong, pois ela não foi encontrada");
        }
        ongRepository.delete(ong0.get());
        return ResponseEntity.status(HttpStatus.OK).body("Ong deletada com sucesso!");
    }

}
