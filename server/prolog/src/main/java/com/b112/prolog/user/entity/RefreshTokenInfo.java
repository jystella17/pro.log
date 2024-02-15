package com.b112.prolog.user.entity;

import lombok.Getter;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@RedisHash
public class RefreshTokenInfo {

    @Id
    @Indexed
    private final String id;
    private final String token;

    @Builder
    public RefreshTokenInfo(String id, String token) {
        this.id = id;
        this.token = token;
    }
}
