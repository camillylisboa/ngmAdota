package com.example.NgmAdota.modules.usuario.controller;

import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.services.CreateUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController()
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    CreateUsuarioService createUsuarioService;

    @PostMapping("/")
    public ResponseEntity<Object> createUsuario(@Valid @RequestBody UsuarioModel usuario) {
        try {
            var result = this.createUsuarioService.execute(usuario);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
