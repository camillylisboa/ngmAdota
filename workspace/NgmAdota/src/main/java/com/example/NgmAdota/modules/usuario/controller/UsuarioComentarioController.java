package com.example.NgmAdota.modules.usuario.controller;

import com.example.NgmAdota.modules.usuario.FeedbackModel;
import com.example.NgmAdota.modules.usuario.services.UsuarioComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario/comentario")
public class UsuarioComentarioController {

    @Autowired
    private UsuarioComentarioService service;

    @PostMapping("/adicionar")
    public ResponseEntity add(@RequestBody FeedbackModel feedbackModel){
        try{
            var result = service.execute(feedbackModel);
            return  ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
