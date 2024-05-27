package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioModel execute(UsuarioModel usuario) {
        this.usuarioRepository.findByEmail(usuario.getEmail())
                .ifPresent((usuarioModel) -> {
                    throw new UserFoundException();
                });

                var password = passwordEncoder.encode(usuario.getSenha());
                usuario.setSenha(password);
                return this.usuarioRepository.save(usuario);
    }
}