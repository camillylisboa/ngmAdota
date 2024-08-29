package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.dto.EditUserDTO;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UsuarioModel execute(RegisterDTO registerDTO) {
        // Verifica se o e-mail já está cadastrado
        UsuarioModel existingUser = usuarioRepository.findByEmail(registerDTO.email());
        if (existingUser != null) {
            throw new UserFoundException("O email " + registerDTO.email() + " já está cadastrado.");
        }

        // Valida a ONG se o usuário for do tipo ONG
        Long ongId = null;
        if (registerDTO.role() == UserRole.ONG) {
            ongId = registerDTO.ongId();
            if (ongId == null || !ongRepository.existsById(ongId)) {
                throw new OngNotFoundException();
            }
        }

        // Criptografa a senha
        String encryptedPassword = passwordEncoder.encode(registerDTO.senha());

        // Cria um novo usuário com ou sem ongId dependendo do tipo de usuário
        UsuarioModel newUser = UsuarioModel.builder()
                .nome(registerDTO.nome())
                .email(registerDTO.email())
                .dataNascimento(registerDTO.dataNascimento())
                .telefone(registerDTO.telefone())
                .senha(encryptedPassword)
                .role(registerDTO.role())
                .ongId(ongId)
                .cep(registerDTO.cep())
                .uf(registerDTO.uf())
                .cidade(registerDTO.cidade())
                .bairro(registerDTO.bairro())
                .logradouro(registerDTO.logradouro())
                .numero(registerDTO.numero())
                .complemento(registerDTO.complemento())
                .build();

        // Salva o novo usuário no banco de dados
        return usuarioRepository.save(newUser);
    }

    public UsuarioModel edit(Integer id, EditUserDTO editDTO) {
        return usuarioRepository.findById(id)
                .map(user -> {
                    user.setNome(editDTO.nome());
                    user.setEmail(editDTO.email());
                    user.setDataNascimento(editDTO.dataNascimento());
                    user.setTelefone(editDTO.telefone());
                    user.setSenha(editDTO.senha());
                    user.setCep(editDTO.cep());
                    user.setUf(editDTO.uf());
                    user.setCidade(editDTO.cidade());
                    user.setBairro(editDTO.bairro());
                    user.setLogradouro(editDTO.logradouro());
                    user.setNumero(editDTO.numero());
                    user.setComplemento(editDTO.complemento());

                    return usuarioRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
}
}
