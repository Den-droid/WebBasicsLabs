package com.example.authexample.services;

import com.example.authexample.dto.UserInfoDto;
import com.example.authexample.dto.auth.SignupDto;

import java.util.List;

public interface UserService {
    void add(SignupDto signupDto);

    void edit(UserInfoDto userInfoDto);

    void deleteByUsername(String username);

    UserInfoDto getByUsername(String username);

    UserInfoDto getByToken(String token);

    List<UserInfoDto> getAllByRole(String role);
}
