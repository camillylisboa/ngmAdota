package com.example.NgmAdota.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String s) {
        super("Usuário não encontrado");
    }
}
