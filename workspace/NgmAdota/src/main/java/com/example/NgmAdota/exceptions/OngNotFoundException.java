package com.example.NgmAdota.exceptions;

public class OngNotFoundException extends RuntimeException{
    public OngNotFoundException() {
        super("ong not found");
    }
}
