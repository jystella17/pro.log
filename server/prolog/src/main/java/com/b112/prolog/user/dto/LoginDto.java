package com.b112.prolog.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDto {

    private final String email;
    private final String password;

    @Builder
    public LoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
