package com.example.NgmAdota.modules.ong.services;

import com.auth0.jwt.algorithms.Algorithm;
import com.example.NgmAdota.modules.ong.OngRepository;
import com.example.NgmAdota.modules.ong.dto.AuthOngDTO;
import com.example.NgmAdota.modules.ong.dto.AuthOngResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthOngService {


    @Value("${security.token.secret.ong}")
    private String secretKey;

    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthOngResponseDTO execute(AuthOngDTO authOngDTO) throws AuthenticationException {
        var ong = ongRepository.findByEmail(authOngDTO.email()).orElseThrow(
                () -> new UsernameNotFoundException("email/Password incorrect"));

        var passwordMatches = passwordEncoder.matches(authOngDTO.senha(), ong.getSenha());
        if (!passwordMatches) {
            throw new AuthenticationException();
        }
//      gerando token JWT
        Algorithm algorithm = Algorithm.HMAC256(secret);

        var expiresToken = Instant.now().plus(Duration.ofHours(2));

        var token = JWT.create().withIssuer("javagas")
                .withExpiresAt(expiresToken)
                .withSubject(company.getId().toString())
                .withClaim("roles", Arrays.asList("COMPANY"))
                .sign(algorithm);

        var authCompanyResponseDTO = AuthCompanyResponseDTO.builder()
                .token(token)
                .expiresToken(expiresToken.toEpochMilli())
                .build();
        return authCompanyResponseDTO;
    }
}

