package com.example.NgmAdota.Repositories;

import com.example.NgmAdota.Models.InteresseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteresseRepository extends JpaRepository<InteresseModel, Long> {
}
