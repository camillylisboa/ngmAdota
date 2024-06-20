package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.RacaModel;
import com.example.NgmAdota.modules.ong.RacaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RacaService {

    @Autowired
    private RacaRepository racaRepository;

    public List<RacaModel> getAllRacas() {
        try {
            return racaRepository.findAllByOrderByTipoAsc();
        } catch (Exception e) {
            // Log do erro para debug
            e.printStackTrace();
            // Lança uma exceção personalizada ou retorna null
            throw new RuntimeException("Erro ao buscar todas as raças", e);
        }
    }
}