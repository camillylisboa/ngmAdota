package com.example.NgmAdota.modules.ong;

import com.example.NgmAdota.modules.animal.AnimalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface OngRepository extends JpaRepository<OngModel, Long> {
    Optional<OngModel> findByEmail(String email);
}
