package com.example.NgmAdota.exceptions;

public class UserFoundException extends RuntimeException{
    public UserFoundException(String s){
        super("Usuário já existe");
    }
}
