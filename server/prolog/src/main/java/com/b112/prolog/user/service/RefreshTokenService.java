package com.b112.prolog.user.service;

import com.b112.prolog.user.jwt.TokenProvider;
import com.b112.prolog.user.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class RefreshTokenService {

    private final TokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    public RefreshTokenService(TokenRepository tokenRepository, TokenProvider tokenProvider) {
        this.tokenRepository = tokenRepository;
        this.tokenProvider = tokenProvider;
    }

    public void saveRefreshToken(String uuid, String refreshToken) {
        tokenRepository.saveRefreshToken(uuid, refreshToken);
    }

    public void deleteRefreshToken(String uuid) {
        tokenRepository.deleteRefreshToken(uuid);
    }

    public void addAtkToBlacklist(String uuid, HttpServletRequest request) {
        String accessToken = tokenProvider.resolveToken(request);
        tokenRepository.addToBlackList(uuid, accessToken);
    }

    public void logout(String uuid, HttpServletRequest request) {
        deleteRefreshToken(uuid);
        addAtkToBlacklist(uuid, request);
    }
}
