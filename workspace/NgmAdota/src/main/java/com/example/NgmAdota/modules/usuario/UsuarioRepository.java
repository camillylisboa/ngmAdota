package com.example.NgmAdota.modules.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
    UsuarioModel findByEmail(String email);
}
