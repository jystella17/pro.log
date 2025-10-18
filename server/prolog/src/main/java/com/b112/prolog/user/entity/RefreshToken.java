package com.b112.prolog.user.entity;

import lombok.Getter;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash
public class RefreshToken {

    @Id
    private final String uuid;
    private final String refreshToken;

    @Builder
    public RefreshToken(String uuid, String refreshToken) {
        this.uuid = uuid;
        this.refreshToken = refreshToken;
    }
}
