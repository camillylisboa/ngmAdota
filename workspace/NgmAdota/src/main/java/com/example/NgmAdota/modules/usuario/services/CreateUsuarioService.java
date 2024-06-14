package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void execute(@Valid RegisterDTO registerDTO) {
        if (this.usuarioRepository.findByEmail(registerDTO.email()) != null) {
            throw new UserFoundException("Já existe um usário assciado a este email " + registerDTO.email());
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.senha());
        UsuarioModel newUser = new UsuarioModel(registerDTO.nome(), registerDTO.email(), registerDTO.dataNascimento(), registerDTO.telefone(), encryptedPassword, registerDTO.role());

        this.usuarioRepository.save(newUser);
    }
}
