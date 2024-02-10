package com.b112.prolog.user.service;

import com.b112.prolog.user.exception.RefreshTokenExpiredException;
import com.b112.prolog.user.util.AuthenticationUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

import static com.b112.prolog.user.jwt.TokenProvider.REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {


    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public void saveRefreshToken(String refreshToken) {
        redisTemplate.opsForValue().set(AuthenticationUtils.getCurrentUserId(), refreshToken, Duration.ofSeconds(REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS));
    }

    @Transactional
    public String findRefreshTokenById(String id) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(id)).orElseThrow(RefreshTokenExpiredException::new);
    }

    @Transactional
    public String findCurrentUserRefreshToken() {
        String id = AuthenticationUtils.getCurrentUserId();
        return findRefreshTokenById(id);
    }

    @Transactional
    public void findCurrentUserRefreshTokenAndCompareWith(String requestRefreshToken) {
        String token = findCurrentUserRefreshToken();
        log.info("User RefreshToken: " + token);
        log.info("Request RefreshToken: " + requestRefreshToken);

        if (!token.equals(requestRefreshToken))
            throw new RefreshTokenExpiredException();
    }

    @Transactional
    public void deleteRefreshTokenById(String id) {
        redisTemplate.delete(id);
    }

    @Transactional
    public void deleteCurrentUserRefreshToken() {
        String id = AuthenticationUtils.getCurrentUserId();
        deleteRefreshTokenById(id);
    }

    @Transactional
    public void reissueCurrentUserRefreshToken(String refreshToken) {
        this.deleteCurrentUserRefreshToken();
        this.saveRefreshToken(refreshToken);
    }
}