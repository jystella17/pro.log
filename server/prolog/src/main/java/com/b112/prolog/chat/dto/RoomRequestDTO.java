package com.b112.prolog.chat.dto;

import lombok.Getter;
import lombok.Builder;

import java.io.Serializable;

@Getter
public class RoomRequestDTO implements Serializable {

    private final String company;
    private final String roomId;
    private final Long userId;

    @Builder
    public RoomRequestDTO(String company, String roomId, Long userId) {
        this.company = company;
        this.roomId = roomId;
        this.userId = userId;
    }
}
