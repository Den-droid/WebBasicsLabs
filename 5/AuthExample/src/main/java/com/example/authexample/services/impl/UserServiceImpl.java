package com.example.authexample.services.impl;

import com.example.authexample.dto.UserInfoDto;
import com.example.authexample.dto.auth.SignupDto;
import com.example.authexample.entities.Role;
import com.example.authexample.entities.User;
import com.example.authexample.entities.UserInfo;
import com.example.authexample.entities.enums.EnumRole;
import com.example.authexample.exceptions.UserAlreadyExistsException;
import com.example.authexample.exceptions.UserNotFoundException;
import com.example.authexample.mappers.UserMapper;
import com.example.authexample.repositories.RoleRepository;
import com.example.authexample.repositories.UserInfoRepository;
import com.example.authexample.repositories.UserRepository;
import com.example.authexample.security.jwt.JwtUtils;
import com.example.authexample.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;

    public UserServiceImpl(UserRepository userRepository,
                           UserInfoRepository userInfoRepository,
                           RoleRepository roleRepository,
                           UserMapper userMapper,
                           JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void add(SignupDto signupDto) {
        if (userRepository.existsByUsername(signupDto.username())) {
            throw new UserAlreadyExistsException(signupDto.username(), "User already exists!");
        }

        User user = userMapper.mapToUser(signupDto);

        UserInfo userInfo = user.getUserInfo();
        userInfo.setUser(user);

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);

        userInfoRepository.save(userInfo);
        userRepository.save(user);
    }

    @Override
    public void edit(UserInfoDto userInfoDto) {
        Optional<User> userOptional = userRepository.findByUsername(userInfoDto.username());
        User user = userOptional.orElseThrow(() ->
                new UserNotFoundException(userInfoDto.username(),
                        "User with such username not found!!!"));
        UserInfo userInfo = user.getUserInfo();

        userMapper.setUserInfo(userInfo, userInfoDto);

        userInfoRepository.save(userInfo);
    }

    @Override
    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public UserInfoDto getByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        User user = userOptional.orElseThrow(() ->
                new UserNotFoundException(username, "User with such username not found!!!"));
        return userMapper.mapToUserInfoDto(user);
    }

    @Override
    public UserInfoDto getByToken(String token) {
        return getByUsername(jwtUtils.getUserNameFromAccessToken(token));
    }

    @Override
    public List<UserInfoDto> getAllByRole(String role) {
        Role usersRole = roleRepository.findByName(EnumRole.valueOf(role))
                .orElseThrow(() -> new RuntimeException("No role found"));

        List<User> users = userRepository.findByRole(usersRole);
        return users.stream()
                .map(userMapper::mapToUserInfoDto)
                .toList();
    }
}
