package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.EspecieModel;
import com.example.NgmAdota.modules.ong.services.EspecieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/especie")
public class EspecieController {

    @Autowired
    private EspecieService especieService;

    @GetMapping("/get")
    public List<EspecieModel> getAllEspecies() {
        return especieService.getAllEspecies();
    }

}
