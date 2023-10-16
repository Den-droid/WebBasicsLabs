package com.example.authexample.exceptions.handlers;

import com.example.authexample.dto.ErrorMessageDto;
import com.example.authexample.exceptions.TokenRefreshException;
import com.example.authexample.exceptions.UserAlreadyExistsException;
import com.example.authexample.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class AuthControllerAdvice {
    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessageDto handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return new ErrorMessageDto(
                HttpStatus.FORBIDDEN.value(),
                LocalDateTime.now().toString(),
                ex.getMessage());
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessageDto handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        return new ErrorMessageDto(
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now().toString(),
                ex.getMessage());
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessageDto handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest request) {
        return new ErrorMessageDto(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now().toString(),
                ex.getMessage());
    }
}
