package com.b112.prolog.chat.dto;

import lombok.Getter;
import lombok.Builder;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
public class ChatRoomResponse implements Serializable {

    private final String roomId;
    private final String company;
    private final int numParticipants;
    private final LocalDateTime lastChat;

    @Builder
    public ChatRoomResponse(String roomId, String company, int numParticipants, LocalDateTime lastChat) {
        this.roomId = roomId;
        this.company = company;
        this.numParticipants = numParticipants;
        this.lastChat = lastChat;
    }
}
