package com.example.NgmAdota.exceptions;

public class AnimalFoundException extends RuntimeException{
    public AnimalFoundException(){
        super("Animal já existe");
    }
}
