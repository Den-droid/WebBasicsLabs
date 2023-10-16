package com.example.authexample.security.utils;

import com.example.authexample.entities.User;
import com.example.authexample.exceptions.UserNotFoundException;
import com.example.authexample.repositories.UserRepository;
import com.example.authexample.security.user_details.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SessionUtil {
    private final UserRepository userRepository;

    public SessionUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserFromSession() {
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username, "User by specified username was not found!"));
    }

}
