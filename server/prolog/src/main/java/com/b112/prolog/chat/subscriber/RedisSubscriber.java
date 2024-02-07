package com.b112.prolog.chat.subscriber;

import com.b112.prolog.chat.dto.SubMessageDTO;
import com.b112.prolog.chat.entity.Chatting;
import com.b112.prolog.chat.exception.PubNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations sendingOperations;

    @Override
    public void onMessage(@NonNull Message message, byte[] pattern) {
        try {
            String publish = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            Chatting pubMsg = objectMapper.readValue(publish, Chatting.class);

            // User Repository 연결 후 삭제
            Random random = new Random();
            String randInt = random.toString();

            SubMessageDTO subMsg = new SubMessageDTO("사용자" + randInt , pubMsg.getMessage(), pubMsg.getCreatedAt());
            sendingOperations.convertAndSend("/chat/sub/" + pubMsg.getRoomId(), subMsg);
        } catch (Exception e) {
            throw new PubNotFoundException(e.getMessage());
        }
    }
}
