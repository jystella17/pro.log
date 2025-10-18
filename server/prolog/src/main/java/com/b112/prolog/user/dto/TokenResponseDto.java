package com.b112.prolog.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenResponseDto {

    private final String accessToken;
    private final String refreshToken;

    @Builder
    public TokenResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
