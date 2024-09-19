package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    Optional<Object> findByNomeAndImagemAndDataNascimentoAndDescricao(String nome, String imagem, LocalDate localDate, String descricao);
    List<AnimalModel> findByOngId(Long ongId);
    List<AnimalModel> findByStatusAnimalId(Long statusAnimalId);
    List<AnimalModel> findByNomeContainingIgnoreCase(String nome);
}