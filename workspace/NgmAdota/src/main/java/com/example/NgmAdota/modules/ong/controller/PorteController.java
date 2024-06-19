package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.PorteModel;
import com.example.NgmAdota.modules.ong.services.PorteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/porte")
public class PorteController {

    @Autowired
    private PorteService porteService;

    @GetMapping("/get")
    public List<PorteModel> getAllPortes() {
        return porteService.getAllPortes();
    }
}
