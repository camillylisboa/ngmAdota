package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.OngFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.ong.dto.OngRequestDTO;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import com.example.NgmAdota.modules.usuario.services.UserRole;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateOngService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OngRepository ongRepository;

    public OngModel execute(@Valid OngRequestDTO ongDTO) {
        // Verifica se a ONG já está cadastrada
        ongRepository.findByEmail(ongDTO.email()).ifPresent(ong -> {
            throw new OngFoundException("Esta ONG já foi cadastrada"); //impede que duas ongs sejam cadastradas com o mesmo email.
        });

        // Converte DTO para entidade ONG
        OngModel ong = convertToEntity(ongDTO);

        // Salva a ONG no banco de dados
        OngModel savedOng = ongRepository.save(ong);

        // Busca o usuário associado ao email fornecido
        UsuarioModel usuario = usuarioRepository.findByEmail(ongDTO.email());
        if (usuario == null) {
            throw new UserNotFoundException("Usuário não encontrado");
        }

        // Atualiza a role do usuário para ONG
        criarOng(savedOng, usuario);

        return savedOng;
    }

    public void criarOng(OngModel ong, UsuarioModel usuario) {
        // Atualiza a role do usuário para ONG
        usuario.setRole(UserRole.ONG);

        // Persiste a alteração no banco de dados
        usuarioRepository.save(usuario);
    }

    private OngModel convertToEntity(OngRequestDTO ongDTO) {
        OngModel ong = new OngModel();
        ong.setRazaosocial(ongDTO.razaosocial());
        ong.setEmail(ongDTO.email());
        ong.setCnpj(ongDTO.cnpj());
        ong.setTelefone(ongDTO.telefone());
        ong.setCep(ongDTO.cep());
        ong.setEstado(ongDTO.estado());
        ong.setCidade(ongDTO.cidade());
        ong.setBairro(ongDTO.bairro());
        ong.setLogradouro(ongDTO.logradouro());
        ong.setNumero(ongDTO.numero());
        ong.setComplemento(ongDTO.complemento());
        return ong;
    }
}
