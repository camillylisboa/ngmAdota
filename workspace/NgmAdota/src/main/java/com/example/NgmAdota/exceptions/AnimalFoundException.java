package com.example.NgmAdota.exceptions;

public class AnimalFoundException extends RuntimeException{
    public AnimalFoundException(String animalJaCadastrado){
        super("Animal já existe");
    }
}
