package br.com.sysmap.bootcamp.domain.exceptions;

public class CustomApiException extends RuntimeException {
    public CustomApiException(String message) {
        super(message);
    }
}
