package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.ong.OngRepository;
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
    @Autowired
    private OngRepository ongRepository;

    public UsuarioModel execute(@Valid RegisterDTO registerDTO) {
        if (this.usuarioRepository.findByEmail(registerDTO.email()) != null) {
            throw new UserFoundException(" " + registerDTO.email());
        }
        if (this.ongRepository.findById(registerDTO.ongId()).isPresent()){
            String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.senha());
            UsuarioModel newUser = new UsuarioModel(registerDTO.nome(), registerDTO.email(), registerDTO.dataNascimento(), registerDTO.telefone(), encryptedPassword, registerDTO.role(), registerDTO.ongId(), registerDTO.cep(), registerDTO.uf(), registerDTO.cidade(), registerDTO.bairro(), registerDTO.logradouro(), registerDTO.numero(), registerDTO.complemento());

            return this.usuarioRepository.save(newUser);
        }
        throw new OngNotFoundException();
    }
}
