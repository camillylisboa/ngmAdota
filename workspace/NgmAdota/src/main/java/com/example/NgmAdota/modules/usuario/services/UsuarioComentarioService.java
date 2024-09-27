package com.example.NgmAdota.modules.usuario.services;

import com.example.NgmAdota.modules.usuario.FeedbackModel;
import com.example.NgmAdota.modules.usuario.FeedbackRepository;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioComentarioService {

    @Autowired
    private FeedbackRepository  feedbackRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public FeedbackModel execute(FeedbackModel requestFeedback){

        // Buscar o UsuarioModel baseado no usuarioId
        Optional<UsuarioModel> usuarioModelOptional = usuarioRepository.findById(requestFeedback.getUsuarioId());

        if (usuarioModelOptional.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado com id: " + requestFeedback.getUsuarioId());
        }

        UsuarioModel usuarioModel = usuarioModelOptional.get();
        FeedbackModel newComent = FeedbackModel.builder()
                .comentario(requestFeedback.getComentario())
                .usuarioId(requestFeedback.getUsuarioId())
                .usuarioModel(usuarioModel)
                .estrelas(requestFeedback.getEstrelas())
                .build();
        return feedbackRepository.save(newComent);
    }

    public List<FeedbackModel> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
