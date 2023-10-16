package com.example.authexample.controllers.rest;

import com.example.authexample.dto.auth.LoginDto;
import com.example.authexample.dto.auth.RefreshTokenDto;
import com.example.authexample.dto.auth.TokensDto;
import com.example.authexample.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        TokensDto jwtDto = authenticationService.authenticateUser(loginDto);
        return ResponseEntity.ok(jwtDto);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {
        TokensDto tokensDto =
                authenticationService.refreshToken(refreshTokenDto);
        return ResponseEntity.ok(tokensDto);
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> logout() {
        authenticationService.logout();
        return ResponseEntity.ok().build();
    }
}
