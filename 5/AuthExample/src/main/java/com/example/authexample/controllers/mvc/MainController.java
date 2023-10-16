package com.example.authexample.controllers.mvc;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @GetMapping("/userinfo")
    public String userinfoPage() {
        return "userinfo";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin";
    }
}
