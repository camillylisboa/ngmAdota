package com.example.NgmAdota.modules.usuario.services;

import java.util.Date;
import java.util.UUID;
import com.example.NgmAdota.exceptions.InvalidTokenException;
import com.example.NgmAdota.exceptions.UserNotFoundException;
import com.example.NgmAdota.modules.usuario.PasswordResetToken;
import com.example.NgmAdota.modules.usuario.PasswordResetTokenRepository;
import com.example.NgmAdota.modules.usuario.UsuarioModel;
import com.example.NgmAdota.modules.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordRecoveryService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void sendPasswordResetLink(String userEmail) {
        UsuarioModel user = usuarioRepository.findByEmail(userEmail);
        if (user == null) {
            throw new UserNotFoundException("Usuário não encontrado");
        }

        // Limpar tokens expirados antes de gerar um novo
        removeExpiredTokens();

        String token;
        do {
            token = UUID.randomUUID().toString();
        } while (tokenRepository.existsByToken(token)); // Garantir que o token é único

        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        tokenRepository.save(resetToken);

        String resetLink = "http://localhost:5500/recuperarSenha.html?token=" + token;
        String subject = "Redefinição de Senha";
        String body = "Clique no link para redefinir sua senha: " + resetLink;

        EmailUtil.sendEmail(userEmail, subject, body);
    }

    public void resetPassword(String token, String newPassword) throws InvalidTokenException {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null || resetToken.isExpired()) {
            throw new InvalidTokenException("Token inválido ou expirado");
        }

        UsuarioModel user = resetToken.getUsuarioModel();
        user.setSenha(passwordEncoder.encode(newPassword));
        usuarioRepository.save(user);

        tokenRepository.delete(resetToken);
    }

    // Método para remover tokens expirados
    private void removeExpiredTokens() {
        Date now = new Date();
        tokenRepository.deleteAll(tokenRepository.findAllByExpiryDateBefore(now));
    }
}
