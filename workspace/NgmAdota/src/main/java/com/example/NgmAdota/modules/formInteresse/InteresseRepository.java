package com.example.NgmAdota.modules.formInteresse;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InteresseRepository extends JpaRepository<InteresseModel, Long> {
    List<InteresseModel> findByAnimalId(Long animalId);
}
