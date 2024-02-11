package com.b112.prolog.chat.dto;

import lombok.Getter;
import lombok.Builder;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
public class PubMessageDTO implements Serializable {

    private final String roomId;
    private final String userId;
    private final String message;
    private final LocalDateTime createdAt;

    @Builder
    public PubMessageDTO(String roomId, Long userId, String message, LocalDateTime createdAt) {
        this.roomId = roomId;
        this.userId = userId.toString();
        this.message = message;
        this.createdAt = createdAt;
    }
}
