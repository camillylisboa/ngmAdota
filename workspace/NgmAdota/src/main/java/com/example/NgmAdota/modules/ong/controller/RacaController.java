package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.RacaModel;
import com.example.NgmAdota.modules.ong.services.RacaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/raca")
public class RacaController {

    @Autowired
    private RacaService racaService;

    @GetMapping("/get")
    public List<RacaModel> getAllRacas() {
        return racaService.getAllRacas();
    }
}
