package com.example.NgmAdota.modules.ong;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OngRepository extends JpaRepository<OngModel, Long> {
    Optional<OngModel> findByEmail(String email);
}
