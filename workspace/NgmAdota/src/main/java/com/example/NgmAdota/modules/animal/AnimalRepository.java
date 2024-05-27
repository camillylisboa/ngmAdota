package com.example.NgmAdota.modules.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    Optional<AnimalModel> findByNomeAndImagemAndDataNascimentoAndDescricao
            (String nome, String imagem, LocalDate dataNascimento, String descricao);
}