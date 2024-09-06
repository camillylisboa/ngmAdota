package com.example.NgmAdota.modules.formInteresse.services;

import com.example.NgmAdota.exceptions.AnimalNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.formInteresse.InteresseModel;
import com.example.NgmAdota.modules.formInteresse.InteresseRepository;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InteresseService {
    @Autowired
    private InteresseRepository interesseRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AnimalRepository animalRepository;

    public InteresseModel execute(InteresseModel request){
        usuarioRepository.findById(request.getUsuarioId()).orElseThrow(() -> {
            throw new UserNotFoundException("Usuário não encontrado");
        });
        animalRepository.findById(request.getAnimalId()).orElseThrow(()->{
            throw new AnimalNotFoundException("Animal não encontrado");
        });

        return this.interesseRepository.save(request);
    }
}
