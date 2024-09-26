package com.example.NgmAdota.modules.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);

    // Verifica se o token já existe
    boolean existsByToken(String token);

    // Busca todos os tokens expirados
    @Query("SELECT p FROM PasswordResetToken p WHERE p.expiryDate < :now")
    List<PasswordResetToken> findAllByExpiryDateBefore(Date now);
}
