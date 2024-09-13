package com.example.NgmAdota.modules.formInteresse.services;

import com.example.NgmAdota.exceptions.AnimalNotFoundException;
import com.example.NgmAdota.exceptions.UserFoundException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.formInteresse.InteresseModel;
import com.example.NgmAdota.modules.formInteresse.InteresseRepository;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.StatusAnimalModel;
import com.example.NgmAdota.modules.ong.StatusAnimalRepository;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InteresseService {
    @Autowired
    private InteresseRepository interesseRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private StatusAnimalRepository statusAnimalRepository;

    public InteresseModel execute(InteresseModel request){
        usuarioRepository.findById(request.getUsuarioId()).orElseThrow(() -> {
            throw new UserNotFoundException("Usuário não encontrado");
        });
        animalRepository.findById(request.getAnimalId()).orElseThrow(()->{
            throw new AnimalNotFoundException("Animal não encontrado");
        });

        return this.interesseRepository.save(request);
    }

    public List<InteresseModel> getInteressesByAnimalId(Long animalId) {
        return interesseRepository.findByAnimalId(animalId);
    }

    public void finalizarAdocao(Long interesseId) {
        InteresseModel interesse = interesseRepository.findById(interesseId)
                .orElseThrow(() -> new RuntimeException("Interesse não encontrado"));

        StatusAnimalModel statusAdotado = statusAnimalRepository.findByTipo("Adotado")
                .orElseThrow(() -> new RuntimeException("Status 'Adotado' não encontrado"));

        // Atualiza o status do animal para 'Adotado'
        interesse.getAnimalModel().setStatusAnimal(statusAdotado);

        // Define a data de adoção como a data atual
        interesse.setDataAdocao(LocalDateTime.now());
//        interesse.setDataAdocao("2007-12-03T10:15:30");
        // Salva as mudanças
        interesseRepository.save(interesse);
    }

}
