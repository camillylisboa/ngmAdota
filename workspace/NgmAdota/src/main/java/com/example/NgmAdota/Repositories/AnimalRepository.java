package com.example.NgmAdota.Repositories;

import com.example.NgmAdota.Models.AnimalModel;
import com.example.NgmAdota.Models.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalModel, Long> {
    Optional<AnimalModel> findByNomeAndDataNascimentoAndIdRacaAndIdEspecie(
            String nome, LocalDate dataNascimento, Integer idRaca, Integer idEspecie
    );
}