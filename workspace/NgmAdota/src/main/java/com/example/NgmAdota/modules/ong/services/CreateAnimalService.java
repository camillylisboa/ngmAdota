package com.example.NgmAdota.modules.ong.services;

import com.example.NgmAdota.exceptions.AnimalFoundException;
import com.example.NgmAdota.exceptions.OngNotFoundException;
import com.example.NgmAdota.modules.ong.AnimalModel;
import com.example.NgmAdota.modules.ong.AnimalRepository;
import com.example.NgmAdota.modules.ong.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CreateAnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Value("${upload.path}")
    private String uploadPath; // Propriedade para o caminho da pasta de uploads

    @Autowired
    private OngRepository ongRepository;

    public AnimalModel execute(AnimalModel animalModel, MultipartFile file) {
        // Verificar se o animal já existe (opcional)
        animalRepository.findByNomeAndImagemAndDataNascimentoAndDescricao(
                animalModel.getNome(),
                animalModel.getImagem(),
                animalModel.getDataNascimento(),
                animalModel.getDescricao()
        ).ifPresent(animal -> {
            throw new AnimalFoundException("Animal já existe em nossa base de dados");
        });

        // Validar se a Ong existe (opcional)
        if (!ongRepository.existsById(animalModel.getOngId())) {
            throw new OngNotFoundException();
        }

        try {
            // Salva o arquivo usando o caminho especificado
            String originalFilename = file.getOriginalFilename();
            Path fileStorageLocation = Paths.get(uploadPath, originalFilename);

            // Cria o diretório se não existir
            Files.createDirectories(fileStorageLocation.getParent());

            // Evitar sobrescrita de arquivos
            Path targetLocation = fileStorageLocation;
            int i = 1;
            while (Files.exists(targetLocation)) {
                String newFilename = originalFilename.substring(0, originalFilename.lastIndexOf('.'))
                        + "_" + i + originalFilename.substring(originalFilename.lastIndexOf('.'));
                targetLocation = Paths.get(uploadPath, newFilename);
                i++;
            }

            // Salva o arquivo
            Files.copy(file.getInputStream(), targetLocation);

            // Atualiza o caminho da imagem no modelo
            animalModel.setImagem(targetLocation.toString());

            return animalRepository.save(animalModel);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar imagem", e);
        }

    }
}
