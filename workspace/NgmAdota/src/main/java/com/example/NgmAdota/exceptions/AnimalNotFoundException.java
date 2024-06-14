package com.example.NgmAdota.exceptions;

public class AnimalNotFoundException extends RuntimeException{
    public AnimalNotFoundException() {
        super("Animal não encontrado");
    }
}
