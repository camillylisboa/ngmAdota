package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.PelagemModel;
import com.example.NgmAdota.modules.ong.services.PelagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/pelagem")
public class PelagemController {

    @Autowired
    private PelagemService pelagemService;

    @GetMapping("/get")
    public List<PelagemModel> getAllPelagens() {
        return pelagemService.getAllPelagens();
    }
}
