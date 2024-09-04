package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusAnimalRepository extends JpaRepository<StatusAnimalModel, Long> {
    List<StatusAnimalModel> findByOrderByTipoAsc();
}