package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.modules.ong.OngModel;
import com.example.NgmAdota.modules.ong.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateOngService {
    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public OngModel execute(OngModel ong){
        this.ongRepository.findByEmail(ong.getEmail())
                .ifPresent((user) -> {
                    throw new UserFoundException();
                });

        var password = passwordEncoder.encode(ong.getSenha());
        ong.setSenha(password);
        return this.ongRepository.save(ong);
    }
}
