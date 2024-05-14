package com.example.NgmAdota.Repositories;

import com.example.NgmAdota.Models.OngModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OngRepository extends JpaRepository<OngModel, Long> {
}
