package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.PorteModel;
import com.example.NgmAdota.modules.ong.PorteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PorteService {

    @Autowired
    private PorteRepository porteRepository;

    public List<PorteModel> getAllPortes() {
        return porteRepository.findAllByOrderByTipoAsc();
    }

}