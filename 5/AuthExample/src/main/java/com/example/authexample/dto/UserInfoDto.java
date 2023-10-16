package com.example.authexample.dto;

import java.time.LocalDate;

public record UserInfoDto(String username, String fullname, String idCard,
                          String faculty, String phoneNumber, LocalDate birthday) {
}
