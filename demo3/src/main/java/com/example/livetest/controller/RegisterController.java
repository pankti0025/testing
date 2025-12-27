package com.example.livetest.controller;

import com.example.livetest.model.User;
import com.example.livetest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class RegisterController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    @ResponseBody
    public String saveUser(@RequestBody User user) {
        userRepository.save(user);
        return "success";
    }
}
