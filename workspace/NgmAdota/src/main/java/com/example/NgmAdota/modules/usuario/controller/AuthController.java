package com.example.NgmAdota.modules.usuario.controller;


import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.usuario.dto.AuthenticationDTO;
import com.example.NgmAdota.modules.usuario.dto.RegisterDTO;
import com.example.NgmAdota.modules.usuario.services.AuthUsuarioService;
import com.example.NgmAdota.modules.usuario.services.CreateUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthUsuarioService authUsuarioService;
    @Autowired
    private CreateUsuarioService usuarioService;


    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody AuthenticationDTO requestDTO){
        try{
            var loginUsuario = authUsuarioService.login(requestDTO);
            return new ResponseEntity(loginUsuario, HttpStatus.OK);
        }catch (UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterDTO registerDTO) {
        try {
            usuarioService.execute(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
}
