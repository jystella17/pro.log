package com.b112.prolog.chat.subscriber;

import com.b112.prolog.chat.dto.PubMessageDTO;
import com.b112.prolog.chat.dto.SubMessageDTO;
import com.b112.prolog.chat.exception.PubNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

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
            String publish = redisTemplate.getStringSerializer().deserialize(message.getBody());

            assert publish != null;
            int idx = publish.indexOf("{");
            publish = publish.substring(idx);

            PubMessageDTO pubMsg = objectMapper.readValue(publish, PubMessageDTO.class);
            SubMessageDTO subMsg = objectMapper.readValue(publish, SubMessageDTO.class);

            sendingOperations.convertAndSend("/sub/chat/room/" + pubMsg.getRoomId(), subMsg);
        } catch (Exception e) {
            throw new PubNotFoundException(e.getMessage());
        }
    }
}
