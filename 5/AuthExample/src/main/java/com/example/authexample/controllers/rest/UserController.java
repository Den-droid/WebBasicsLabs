package com.example.authexample.controllers.rest;

import com.example.authexample.dto.UserInfoDto;
import com.example.authexample.dto.auth.SignupDto;
import com.example.authexample.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{token}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserInfoDto> getUserByToken(@PathVariable String token) {
        UserInfoDto userInfoDto = userService.getByToken(token);
        return ResponseEntity.ok(userInfoDto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserInfoDto>> getUsersByRole(@RequestParam String role) {
        List<UserInfoDto> userInfoDtoList = userService.getAllByRole(role);
        return ResponseEntity.ok(userInfoDtoList);
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody SignupDto signUpDto) {
        userService.add(signUpDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public void editUser(@RequestBody UserInfoDto userInfoDto) {
        userService.edit(userInfoDto);
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUserByUsername(@PathVariable String username) {
        userService.deleteByUsername(username);
    }
}
