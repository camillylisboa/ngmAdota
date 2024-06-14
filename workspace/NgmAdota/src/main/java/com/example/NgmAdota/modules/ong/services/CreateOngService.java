package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.OngFoundException;
import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.ong.dto.OngRequestDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CreateOngService {
    @Autowired
    private OngRepository ongRepository;

  public OngModel execute(@Valid OngRequestDTO ongDTO){
      ongRepository.findByEmail(ongDTO.email()).ifPresent(ong -> {
          throw new OngFoundException("Esta ong já foi cadastrada");
      });

      OngModel ong = convertToEntity(ongDTO);

      OngModel savedOng = ongRepository.save(ong);

      return convertToResponseDTO(savedOng);
  }

  private OngModel convertToEntity(OngRequestDTO ongDTO){
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

  private OngModel convertToResponseDTO(OngModel ong){
      return OngModel.builder()
              .id(ong.getId())
              .razaosocial(ong.getRazaosocial())
              .email(ong.getEmail())
              .cnpj(ong.getCnpj())
              .telefone(ong.getTelefone())
              .cep(ong.getCep())
              .estado(ong.getEstado())
              .cidade(ong.getCidade())
              .bairro(ong.getBairro())
              .logradouro(ong.getLogradouro())
              .numero(ong.getNumero())
              .complemento(ong.getComplemento())
              .build();
  }
}
