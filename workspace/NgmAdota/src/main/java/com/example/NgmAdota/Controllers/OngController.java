package com.example.NgmAdota.Controllers;

import com.example.NgmAdota.Dtos.OngRequestDTO;
import com.example.NgmAdota.Models.OngModel;
import com.example.NgmAdota.Repositories.OngRepository;
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
    OngRepository ongRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<OngModel> cadastroOng(@RequestBody @Valid OngRequestDTO request) {
        var ongModel = new OngModel();
        BeanUtils.copyProperties(request, ongModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(ongRepository.save(ongModel));
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
