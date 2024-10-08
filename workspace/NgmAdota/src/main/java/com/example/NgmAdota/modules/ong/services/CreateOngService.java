package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.OngFoundException;
import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.ong.dto.OngRequestDTO;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.services.UserRole;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateOngService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OngRepository ongRepository;

    public OngModel execute(@Valid OngModel ongDTO) {
        // Verifica se a ONG já está cadastrada
        ongRepository.findByEmail(ongDTO.getEmail()).ifPresent(ong -> {
            throw new OngFoundException("Esta ONG já foi cadastrada"); // Impede que duas ONGs sejam cadastradas com o mesmo email.
        });

       UsuarioModel usuario = usuarioRepository.findByEmail(ongDTO.getEmail());
       if (usuario != null){
           OngModel save = ongRepository.save(ongDTO);
           criarOng(save, usuario);
           return save;
       }
        // minha pergunta é básica o cara que for criar a ong ele obrigatóriamente deve usar o email do login dele??
       throw new UserNotFoundException("Usuário não encontrado");
    }

    public void criarOng(OngModel ong, UsuarioModel usuario) {
        // Atualiza a role do usuário para ONG
        usuario.setRole(UserRole.ONG);
        // Persiste a alteração no banco de dados
        usuarioRepository.save(usuario);
    }
}
