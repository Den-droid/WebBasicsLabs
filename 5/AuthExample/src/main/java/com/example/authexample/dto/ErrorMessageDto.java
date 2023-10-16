package com.example.authexample.dto;

public record ErrorMessageDto(int statusCode, String timestamp, String message) {
}
