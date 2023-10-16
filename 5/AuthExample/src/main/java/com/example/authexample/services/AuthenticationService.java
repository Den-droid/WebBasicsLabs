package com.example.authexample.services;

import com.example.authexample.dto.auth.LoginDto;
import com.example.authexample.dto.auth.RefreshTokenDto;
import com.example.authexample.dto.auth.TokensDto;

public interface AuthenticationService {
    TokensDto authenticateUser(LoginDto loginDto);

    TokensDto refreshToken(RefreshTokenDto refreshTokenDto);

    void logout();
}
