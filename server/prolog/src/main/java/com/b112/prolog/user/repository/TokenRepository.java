package com.b112.prolog.user.repository;

import com.b112.prolog.user.entity.RefreshToken;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class TokenRepository {

    @Resource(name = "redisTemplate")
    private SetOperations<String, String> refreshTokens;

    public boolean isRefreshTokenExists(String uuid) {
        return Boolean.TRUE.equals(refreshTokens.getOperations().hasKey(uuid));
    }

    public String getRefreshToken(String uuid) {
        return refreshTokens.randomMember(uuid);
    }

    public void saveRefreshToken(String uuid, String refreshToken) {
        refreshTokens.add(uuid, refreshToken);
        refreshTokens.getOperations().expire(uuid, 14L, TimeUnit.DAYS);
    }

    public void deleteRefreshToken(String uuid) {
        if(Boolean.TRUE.equals(refreshTokens.getOperations().hasKey(uuid))) {
            refreshTokens.getOperations().delete(uuid);
        }
    }

    public void addToBlackList(String uuid, String accessToken) {
        refreshTokens.add("ATK|"+uuid, accessToken);
        log.info("User " + uuid + " Logged out : " + refreshTokens.randomMember("ATK|"+uuid));
    }

    public boolean isInBlackList(String uuid) {
        return Boolean.TRUE.equals(refreshTokens.getOperations().hasKey("ATK|"+uuid));
    }
}
