package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PelagemRepository extends JpaRepository<PelagemModel, Long> {
    List<PelagemModel> findAllByOrderByTipoAsc();
}
