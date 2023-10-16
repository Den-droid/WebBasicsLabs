package com.example.authexample.dto.auth;

import java.time.LocalDate;

public record SignupDto(String username, String password, String fullname, String idCard,
                        String faculty, String phoneNumber, LocalDate birthday){
}
