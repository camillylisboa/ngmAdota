package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritoRepository extends JpaRepository<FavoritoModel, Long> {
    List<FavoritoModel> findByUsuarioId(Long usuarioId); // Buscar os favoritos de um usuário
    boolean existsByUsuarioIdAndAnimalId(Long usuarioId, Long animalId); // Verificar se um animal já foi favoritado por um usuário
}
