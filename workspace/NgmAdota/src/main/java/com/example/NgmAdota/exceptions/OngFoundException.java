package com.example.NgmAdota.exceptions;

public class OngFoundException extends RuntimeException {
    public OngFoundException(String a) {
        super("ong já existe");
    }
}
