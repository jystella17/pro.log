package com.b112.prolog.chat.entity;

import lombok.Getter;
import lombok.Builder;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class Chatting implements Serializable {

    private String chatId;
    private String roomId;
    private String userId;
    private String message;
    private LocalDateTime createdAt;

    @Builder
    public Chatting(String roomId, String userId, String message, LocalDateTime createdAt) {
        this.chatId = UUID.randomUUID().toString();
        this.roomId = roomId;
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
    }

    @Builder
    public Chatting(String userId, String message, LocalDateTime createdAt) {
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
    }

}
