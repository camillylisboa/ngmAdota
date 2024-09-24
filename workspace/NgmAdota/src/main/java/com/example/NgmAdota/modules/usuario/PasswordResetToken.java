package com.example.NgmAdota.modules.usuario;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UsuarioModel usuarioModel;

    private Date expiryDate;

    public PasswordResetToken() {}

    public PasswordResetToken(String token, UsuarioModel user) {
        this.token = token;
        this.usuarioModel = user;
        this.expiryDate = calculateExpiryDate(24 * 60); // 24 horas
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }

    public boolean isExpired() {
        return new Date().after(this.expiryDate);
    }

    // Getters e setters
}

