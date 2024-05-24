package com.example.NgmAdota.Controllers;


import com.example.NgmAdota.Dtos.CadastroRequestDTO;
import com.example.NgmAdota.Dtos.LoginRequestDTO;
import com.example.NgmAdota.Dtos.ResponseUsuarioDTO;
import com.example.NgmAdota.Models.UsuarioModel;
import com.example.NgmAdota.Repositories.UsuarioRepository;
import com.example.NgmAdota.infra.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/editar/{id}")
    public ResponseEntity<Object> editarUsuario(@PathVariable(value = "id") Long id,
                                                @RequestBody @Valid CadastroRequestDTO request){
        Optional<UsuarioModel> usuarioEdit = usuarioRepository.findById(id);
        if(usuarioEdit.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel editar os dados deste animal, pois ele não foi encontrado");
        }
        var usuarioModel = usuarioEdit.get();
        usuarioModel.setNome(request.nome());
        usuarioModel.setEmail(request.email());
        usuarioModel.setDataNascimento(request.dataNascimento());
        usuarioModel.setTelefone(request.telefone());
        usuarioModel.setSenha(passwordEncoder.encode(request.senha()));
        this.usuarioRepository.save(usuarioModel);
        return ResponseEntity.ok(new ResponseUsuarioDTO(usuarioModel.getID(), usuarioModel.getNome(), usuarioModel.getEmail(),
                                usuarioModel.getTelefone(), usuarioModel.getDataNascimento(), usuarioModel.idade(), usuarioModel.getSenha(), null));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginRequestDTO request){
        UsuarioModel user = this.usuarioRepository.findByEmail(request.email()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if(passwordEncoder.matches(request.senha(), user.getSenha())){
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseUsuarioDTO(user.getID(), user.getNome(), user.getEmail(), user.getTelefone(), user.getDataNascimento(), user.idade(), user.getSenha(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid CadastroRequestDTO request){
        Optional<UsuarioModel> user = this.usuarioRepository.findByEmail(request.email());

        if(user.isEmpty()){
            UsuarioModel newUser = new UsuarioModel();
            newUser.setSenha(passwordEncoder.encode(request.senha()));
            newUser.setEmail(request.email());
            newUser.setNome(request.nome());
            newUser.setDataNascimento(request.dataNascimento());
            newUser.setTelefone(request.telefone());

            this.usuarioRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseUsuarioDTO(newUser.getID(), newUser.getNome(), newUser.getEmail(), newUser.getTelefone(), newUser.getDataNascimento(), newUser.idade(), newUser.getSenha(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}


