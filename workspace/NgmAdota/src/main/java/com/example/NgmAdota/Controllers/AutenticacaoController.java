package com.example.NgmAdota.Controllers;

import com.example.NgmAdota.Dtos.CadastroRequestDTO;
import com.example.NgmAdota.Dtos.LoginRequestDTO;
import com.example.NgmAdota.Dtos.ResponseDTO;
import com.example.NgmAdota.Models.UsuarioModel;
import com.example.NgmAdota.Repositories.UsuarioRepository;
import com.example.NgmAdota.infra.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AutenticacaoController {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginRequestDTO request){
        UsuarioModel user = this.usuarioRepository.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if(passwordEncoder.matches(request.senha(), user.getSenha())){
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid CadastroRequestDTO request){
        Optional<UsuarioModel> user = this.usuarioRepository.findByEmail(request.email());

        if(user.isEmpty()){
            UsuarioModel newUser = new UsuarioModel();
            newUser.setSenha(passwordEncoder.encode(request.senha()));
            newUser.setEmail(request.email());
            newUser.setNome(request.nome());
            this.usuarioRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}