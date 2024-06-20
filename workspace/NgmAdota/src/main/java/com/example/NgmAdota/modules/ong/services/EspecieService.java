package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.EspecieModel;
import com.example.NgmAdota.modules.ong.EspecieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecieService {

    @Autowired
    private EspecieRepository especieRepository;

    public List<EspecieModel> getAllEspecies() {
        return especieRepository.findAllByOrderByTipoAsc();
    }

}
