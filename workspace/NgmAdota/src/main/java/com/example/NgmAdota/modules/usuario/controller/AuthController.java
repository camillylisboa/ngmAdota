package com.example.NgmAdota.modules.usuario.controller;


import com.example.NgmAdota.infra.security.TokenService;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.dto.AuthenticationDTO;
import com.example.NgmAdota.modules.usuario.dto.LoginResponseDTO;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import com.example.NgmAdota.modules.usuario.services.CreateUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private CreateUsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO requestDTO){
        UsuarioModel user = this.usuarioRepository.findByEmail(requestDTO.email());
        var usuarioSenha = new UsernamePasswordAuthenticationToken(requestDTO.email(), requestDTO.senha());
        var auth = this.authenticationManager.authenticate(usuarioSenha);

        if(passwordEncoder.matches(requestDTO.senha(), user.getSenha())){
            var token = tokenService.generateToken((UsuarioModel) auth.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDTO(user.getID(), user.getNome(), user.getEmail(), user.getTelefone(), user.idade(), token));
        }
        return ResponseEntity.badRequest().build();

    }

    @PostMapping("/register")
    public  ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO){
        var createUsuario = usuarioService.execute(registerDTO);
        return new ResponseEntity<>(createUsuario, HttpStatus.CREATED);
    }
}
