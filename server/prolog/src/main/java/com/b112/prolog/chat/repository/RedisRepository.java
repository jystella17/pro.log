package com.b112.prolog.chat.repository;

import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.HashOperations;

@Service
@RequiredArgsConstructor
public class RedisRepository {

    private static final String CHATTING = "CHATTING";
    private static final String MEMBER = "MEMBER";

    // 각 채팅방에 참여한 사용자 - MEMBER, RoomId, UserId
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> chatMembers;

    // 채팅 메시지 - CHATTING, RoomId, UserId, Message, CreatedAt
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> chatMessages;

    public void addChatRoom(String roomId, String userId) {
        chatMembers.put(MEMBER, roomId, userId);
    }

    public void delFromChatRoom(String roomId, String userId) {
        chatMembers.delete(MEMBER, roomId, userId);
    }

    public String isUserInRoom(String roomId) {
        return chatMembers.get(MEMBER, roomId);
    }

    public void newChattingMsg(String roomId, String chatting) {
        chatMessages.put(CHATTING, roomId, chatting);
    }
}
