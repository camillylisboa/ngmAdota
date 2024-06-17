package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {

    Optional<Object> findByNomeAndImagemAndDataNascimentoAndDescricao(String nome, String imagem, LocalDate localDate, String descricao);
}