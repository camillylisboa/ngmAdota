package com.example.NgmAdota.modules.usuario.controller;

import com.example.NgmAdota.exceptions.InvalidTokenException;
import com.example.NgmAdota.modules.usuario.services.PasswordRecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
public class EmailSubmissionControlller {

    @Autowired
    private PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/password/reset-link")
    public void sendResetLink(@RequestParam String email) {
        passwordRecoveryService.sendPasswordResetLink(email);
    }

    @PostMapping("/password/reset")
    public void resetPassword(@RequestParam String token, @RequestParam String newPassword) throws InvalidTokenException {
        passwordRecoveryService.resetPassword(token, newPassword);
    }
}

