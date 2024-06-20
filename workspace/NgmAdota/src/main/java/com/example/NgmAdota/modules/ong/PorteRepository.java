package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PorteRepository extends JpaRepository<PorteModel, Long> {
    List<PorteModel> findAllByOrderByTipoAsc();
}
