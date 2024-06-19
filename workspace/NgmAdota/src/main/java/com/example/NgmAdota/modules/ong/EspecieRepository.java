package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EspecieRepository extends JpaRepository<EspecieModel, Long> {
    List<EspecieModel> findAllByOrderByTipoAsc();
}
