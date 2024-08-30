package com.example.NgmAdota.modules.usuario.controller;


import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.dto.AuthenticationDTO;
import com.example.NgmAdota.modules.usuario.dto.EditUserDTO;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import com.example.NgmAdota.modules.usuario.services.AuthUsuarioService;
import com.example.NgmAdota.modules.usuario.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthUsuarioService authUsuarioService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody AuthenticationDTO requestDTO){
        try{
            var loginUsuario = authUsuarioService.login(requestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(loginUsuario);
        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity editUser(@Valid @PathVariable(value = "id") Integer id,@RequestBody EditUserDTO editDTO){
        try{
            var editUser = usuarioService.edit(id, editDTO);
            return ResponseEntity.status(HttpStatus.OK).body(editUser);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterDTO registerDTO) {
        try {
            var newUser = this.usuarioService.execute(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/lista")
    public ResponseEntity<List<UsuarioModel>> listarUsuario() {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findAll());
    }
}
