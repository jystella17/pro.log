package com.b112.prolog.chat.dto;

import lombok.Getter;
import lombok.Builder;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
public class SubMessageDTO implements Serializable {

    private final String userId;
    private final String message;
    private final String createdAt;

    @Builder
    public SubMessageDTO(String userId, String message, String createdAt) {
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
    }
}
