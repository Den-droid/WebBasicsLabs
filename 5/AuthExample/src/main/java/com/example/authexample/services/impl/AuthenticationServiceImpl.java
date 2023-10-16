package com.example.authexample.services.impl;

import com.example.authexample.dto.auth.LoginDto;
import com.example.authexample.dto.auth.RefreshTokenDto;
import com.example.authexample.dto.auth.TokensDto;
import com.example.authexample.entities.User;
import com.example.authexample.exceptions.TokenRefreshException;
import com.example.authexample.repositories.UserRepository;
import com.example.authexample.security.jwt.JwtUtils;
import com.example.authexample.security.user_details.UserDetailsImpl;
import com.example.authexample.services.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,
                                     UserRepository userRepository,
                                     JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public TokensDto authenticateUser(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.username(), loginDto.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String accessToken = jwtUtils.generateAccessToken(userDetails.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(userDetails.getUsername());

        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        user.setRefreshToken(refreshToken);

        userRepository.save(user);

        return new TokensDto(accessToken, refreshToken);
    }

    @Override
    public TokensDto refreshToken(RefreshTokenDto refreshTokenDto)
            throws TokenRefreshException {
        String requestRefreshToken = refreshTokenDto.refreshToken();

        if (!jwtUtils.validateRefreshToken(requestRefreshToken)) {
            throw new TokenRefreshException(requestRefreshToken, "Refresh token is invalid! " +
                    "Please sign in again to get new!");
        }

        String username = jwtUtils.getUserNameFromRefreshToken(requestRefreshToken);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));

        String accessToken = jwtUtils.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername());

        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return new TokensDto(accessToken, refreshToken);
    }

    @Override
    public void logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
