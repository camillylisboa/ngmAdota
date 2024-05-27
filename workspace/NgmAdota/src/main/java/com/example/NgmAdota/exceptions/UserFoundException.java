package com.example.NgmAdota.exceptions;

public class UserFoundException extends RuntimeException{
    public UserFoundException(){
        super("Usuário já existe");
    }
}
