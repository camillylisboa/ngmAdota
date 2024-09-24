package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.*;
import com.example.NgmAdota.modules.ong.dto.AnimalDTO;
import com.example.NgmAdota.modules.ong.dto.EditAnimalDTO;
import com.example.NgmAdota.modules.ong.services.CreateAnimalService;
import com.example.NgmAdota.modules.ong.services.EditAnimalService;
import com.example.NgmAdota.modules.ong.services.ListarAnimaisService;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private FavoritoRepository favoritoRepository;

    @Autowired
    private EditAnimalService editAnimalService;

    @Autowired
    private ListarAnimaisService listarAnimaisService;

    @Value("${upload.path}")
    private String uploadPath; // Propriedade para o caminho da pasta de uploads

    // Método para criar um novo animal
    @PostMapping("/")
    public ResponseEntity<?> createAnimal(
            @RequestPart("animal") @Valid AnimalModel animalModel,
            @RequestPart("file") MultipartFile file) {
        try {
            var newAnimal = createAnimalService.execute(animalModel, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAnimal);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // Método para editar um animal existente
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editAnimal(
            @PathVariable(value = "id") Long id,
            @RequestPart("animal") @Valid EditAnimalDTO editDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            var editAnimal = editAnimalService.edit(id, editDTO, file, "/Workspace/NgmAdotaRepositorio/ngmAdota/uploads"); // Passa o caminho para upload
            return ResponseEntity.status(HttpStatus.OK).body(editAnimal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Método para listar todos os animais
    @GetMapping("/lista")
    public ResponseEntity<List<AnimalModel>> listarAnimais() {
        return ResponseEntity.status(HttpStatus.OK).body(animalRepository.findAll());
    }

    // Método para listar animais com status de adoção
    @GetMapping("/lista/adocao")
    public List<AnimalModel> getAnimalsByStatus(@RequestParam StatusAnimalModel statusAnimal) {
        return editAnimalService.findAnimalsByStatusId(statusAnimal.getId());
    }

    @GetMapping("/lista/favorito")
    public List<FavoritoModel> getFavoritoByUsuario(@RequestParam UsuarioModel usuario) {
        return editAnimalService.findByUsuarioId(usuario.getId());
    }

    @GetMapping("/lista/nome")
    public List<AnimalModel> getAnimalByNome(@RequestParam String nome){
        return editAnimalService.findByNome(nome);
    }

    // Método para listar um animal por ID
    @GetMapping("/lista/{id}")
    public ResponseEntity<Object> listarUmAnimal(@PathVariable(value = "id") Long id) {
        Optional<AnimalModel> animalO = animalRepository.findById(id);
        if (animalO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado no sistema");
        }
        return ResponseEntity.status(HttpStatus.OK).body(animalO.get());
    }

    // Método para listar animais verificando se são favoritos para o usuário
    @GetMapping("/lista/usuario/{usuarioId}")
    public ResponseEntity<List<AnimalDTO>> listarAnimaisPorUsuario(@PathVariable Long usuarioId) {
        try {
            List<AnimalDTO> animaisComFavorito = listarAnimaisService.listarAnimais(usuarioId);
            return ResponseEntity.status(HttpStatus.OK).body(animaisComFavorito);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
