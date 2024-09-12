package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.dto.FavoritoDTO;
import com.example.NgmAdota.modules.ong.services.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/favorito")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    // Endpoint para alternar o status de favorito de um animal
    @PutMapping("/{animalId}/usuario/{usuarioId}")
    public ResponseEntity<FavoritoDTO> alternarFavorito(
            @PathVariable Long animalId,
            @PathVariable Long usuarioId,
            @RequestHeader("Authorization") String token) {

        boolean isFavoritado = favoritoService.alternarFavorito(usuarioId, animalId);

        FavoritoDTO favoritoDTO = new FavoritoDTO(isFavoritado);
        return ResponseEntity.ok(favoritoDTO);
    }


}