package com.example.authexample.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username, String message) {
        super(String.format("Error for user %s : %s", username, message));
    }
}
