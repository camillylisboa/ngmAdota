package com.example.NgmAdota.exceptions;

public class AnimalNotFoundException extends RuntimeException{
    public AnimalNotFoundException(String s) {
        super("Animal não encontrado");
    }
}
