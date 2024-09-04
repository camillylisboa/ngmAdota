package com.example.NgmAdota.modules.ong.controller;

import com.example.NgmAdota.modules.ong.StatusAnimalModel;
import com.example.NgmAdota.modules.ong.services.StatusAnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/statusAnimal")
public class StatusAnimalController {

    @Autowired
    private StatusAnimalService statusAnimalService;

    @GetMapping("/get")
    public List<StatusAnimalModel> getAllStatusAnimal() {
        return statusAnimalService.getAllStatusAnimal();
    }
}
