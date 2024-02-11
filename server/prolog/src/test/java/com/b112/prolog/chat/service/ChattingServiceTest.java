package com.b112.prolog.chat.service;

import com.b112.prolog.chat.dto.PubMessageDTO;
import com.b112.prolog.chat.dto.RoomRequestDTO;

import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.LocalDateTime;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ChattingServiceTest {

    @Autowired
    private ChattingService chatService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Test
    @DisplayName("채팅방 입장 테스트")
    void enterChatRoomTest() {
        RoomRequestDTO roomReq = RoomRequestDTO.builder().company("라인").roomId("1T57J98").userId(3L).build();
        String company = chatService.enterChatRoom(roomReq);

        Assertions.assertThat(company).isEqualTo("라인");
        System.out.println("TEST: " + company);
    }

    @Test
    @DisplayName("채팅 전송 테스트")
    void sendChatting() {
        PubMessageDTO pubMsg = PubMessageDTO.builder().roomId("1T57J98").userId(3L).message("2024년 공채 열리나요?")
                                .createdAt(LocalDateTime.now()).build();

        Object message = redisTemplate.opsForHash().get("CHATTING", "1T57J98");
        Long response = chatService.sendChatting(pubMsg);
        Assertions.assertThat(1L).isEqualTo(response);
    }

    @Test
    void leaveChatRoom() {
    }
}
