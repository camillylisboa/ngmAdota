package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAnimalsOngService {

    @Autowired
    private AnimalRepository repository;

    public List<AnimalModel> getAnimalsOng(Long ongId){
        return repository.findByOngId(ongId);
    }
}
