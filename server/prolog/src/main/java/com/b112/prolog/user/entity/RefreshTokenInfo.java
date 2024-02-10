package com.b112.prolog.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@AllArgsConstructor
@Getter
@Builder
@RedisHash

public class RefreshTokenInfo {

    @Id
    @Indexed
    private String id;
    private String token;

}