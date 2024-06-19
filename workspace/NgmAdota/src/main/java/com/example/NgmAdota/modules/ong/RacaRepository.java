package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RacaRepository extends JpaRepository<RacaModel, Long> {
    List<RacaModel> findAllByOrderByTipoAsc();
}
