package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.FavoritoModel;
import com.example.NgmAdota.modules.ong.FavoritoRepository;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    public boolean alternarFavorito(Long usuarioId, Long animalId) {
        if (favoritoRepository.existsByUsuarioIdAndAnimalId(usuarioId, animalId)) {
            desfavoritarAnimal(usuarioId, animalId);
            return false; // O animal foi desfavoritado
        } else {
            favoritarAnimal(usuarioId, animalId);
            return true; // O animal foi favoritado
        }
    }

    public void favoritarAnimal(Long usuarioId, Long animalId) {
        FavoritoModel favorito = FavoritoModel.builder()
                .usuario(UsuarioModel.builder().id(usuarioId).build())
                .animal(AnimalModel.builder().id(animalId).build())
                .build();

        favoritoRepository.save(favorito);
    }

    public void desfavoritarAnimal(Long usuarioId, Long animalId) {
        FavoritoModel favorito = favoritoRepository.findByUsuarioId(usuarioId).stream()
                .filter(f -> f.getAnimal().getId().equals(animalId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Favorito não encontrado para este animal e usuário"));

        favoritoRepository.delete(favorito);
    }
}