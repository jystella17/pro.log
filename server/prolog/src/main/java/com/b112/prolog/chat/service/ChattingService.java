package com.b112.prolog.chat.service;

import com.b112.prolog.chat.entity.ChatRoom;
import com.b112.prolog.chat.entity.Chatting;
import com.b112.prolog.chat.dto.PubMessageDTO;
import com.b112.prolog.chat.dto.RoomRequestDTO;
import com.b112.prolog.chat.repository.RedisRepository;
import com.b112.prolog.chat.repository.ChatRoomRepository;
import com.b112.prolog.chat.exception.ChatRoomNotFoundException;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;
import org.json.simple.JSONObject;
import org.springframework.util.Assert;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;

@Service
@RequiredArgsConstructor
public class ChattingService {

    private final RedisRepository redisRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic channelTopic;

    @Transactional // 유저가 채팅방 입장 -> 유저의 참여 채팅 목록 & 채팅방의 참여 유저 목록에 추가
    public String enterChatRoom(RoomRequestDTO roomRequest) {
        ChatRoom chatRoom = chatRoomRepository.findByCompany(roomRequest.getCompany())
                .orElseThrow(ChatRoomNotFoundException::new);

        Assert.isTrue(roomRequest.getCompany().equals(chatRoom.getCompany()), "ChatRoom Found: " + chatRoom.getCompany());
        redisRepository.addChatRoom(roomRequest.getRoomId(), roomRequest.getUserId().toString());

        // User Collection의 참여 채팅 목록 add
        // chatRoom.getParticipants().add(roomRequest.getUserId());
        //chatRoomRepository.save(chatRoom);

        redisTemplate.opsForHash();
        return roomRequest.getCompany();
    }

    // 유저가 채팅 전송 -> 다른 유저에게 Subscribe
    public Long sendChatting(PubMessageDTO pubMessage) {
        Chatting msg = Chatting.builder().roomId(pubMessage.getRoomId()).userId(pubMessage.getUserId())
                        .message(pubMessage.getMessage()).createdAt(pubMessage.getCreatedAt()).build();

        JSONObject object = new JSONObject();
        object.put("chatId", msg.getChatId()); object.put("userId", msg.getUserId()); object.put("message", msg.getMessage());
        object.put("createdAt", msg.getCreatedAt().toString()); object.put("roomId", msg.getRoomId());

        redisRepository.newChattingMsg(pubMessage.getRoomId(), object.toString());

        String channel = channelTopic.getTopic();
        // 인증 모듈 연결 후 nickname 받아오도록 수정
        Long response = redisTemplate.convertAndSend(channel, object.toString());
        redisTemplate.opsForHash();

        return response;
    }

    /*
    TODO: 채팅방 나가기 -> WebSocket Connection 해제, 참여 채팅 목록에서 제거
     */
    public void leaveChatRoom(Long userId, String roomId) {
        // 유저의 참여 채팅 목록에서 현재 채팅방 삭제
        redisRepository.delFromChatRoom(roomId, userId.toString());
    }

    /*
    TODO: 스케줄러 - Redis에 저장된 채팅방 별 참여 유저 목록을 몽고DB에 주기적으로 업데이트
     */
}
