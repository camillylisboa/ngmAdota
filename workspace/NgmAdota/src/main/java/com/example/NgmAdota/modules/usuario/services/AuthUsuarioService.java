package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.exceptions.InvalidCredentialsException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.infra.security.TokenService;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.dto.AuthenticationDTO;
import com.example.NgmAdota.modules.usuario.dto.LoginResponseDTO;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthUsuarioService implements UserDetailsService {
    @Autowired
    private TokenService tokenService;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(@Valid AuthenticationDTO requestDTO) {
        UsuarioModel user = this.usuarioRepository.findByEmail(requestDTO.email());

        // Verifica se o usuário existe
        if (user == null) {
            throw new UserNotFoundException("Usuário com o email " + requestDTO.email() + " não encontrado.");
        }

        // Verifica se a senha está correta
        if (!passwordEncoder.matches(requestDTO.senha(), user.getSenha())) {
            throw new InvalidCredentialsException("Email ou senha inválidos.");
        }

        // Autenticação bem-sucedida
        var usuarioSenha = new UsernamePasswordAuthenticationToken(requestDTO.email(), requestDTO.senha());
        var auth = this.authenticationManager.authenticate(usuarioSenha);

        // Gera o token
        var token = tokenService.generateToken((UsuarioModel) auth.getPrincipal());

        return new LoginResponseDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getTelefone(),
                user.idade(),
                user.getDataNascimento(),
                user.getCep(),
                user.getUf(),
                user.getCidade(),
                user.getBairro(),
                user.getLogradouro(),
                user.getNumero(),
                user.getComplemento(),
                user.getOngId(),
                user.getRole(),
                token);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username);
    }
}