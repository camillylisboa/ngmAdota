package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.PelagemModel;
import com.example.NgmAdota.modules.ong.PelagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PelagemService {

    @Autowired
    private PelagemRepository pelagemRepository;

    public List<PelagemModel> getAllPelagens() {
        return pelagemRepository.findAllByOrderByTipoAsc();
    }
}
