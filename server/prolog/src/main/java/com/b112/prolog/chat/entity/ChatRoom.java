package com.b112.prolog.chat.entity;

import jakarta.persistence.GeneratedValue;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Document(collation = "Chatroom")
public class ChatRoom {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2")
    private String roomId;

    private String company;

    private List<Long> participants;

    private int numParts;

    private LocalDateTime createdAt;

    private LocalDateTime lastChat;

    @Builder
    public ChatRoom(String company, List<Long> participants, LocalDateTime createdAt, LocalDateTime lastChat) {
        this.company = company;
        this.participants = participants;
        this.numParts = participants.size();
        this.createdAt = createdAt;
        this.lastChat = lastChat;
    }

    @Builder
    public ChatRoom(Long newParticipant) {
        this.participants.add(newParticipant);
        numParts++;
    }

    @Builder
    public ChatRoom(LocalDateTime newLastChat){
        this.lastChat = newLastChat;
    }
}
