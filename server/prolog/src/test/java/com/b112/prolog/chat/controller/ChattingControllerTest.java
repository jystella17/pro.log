package com.b112.prolog.chat.controller;

import static org.mockito.BDDMockito.*;

import com.b112.prolog.chat.dto.RoomRequestDTO;
import com.b112.prolog.chat.service.ChattingService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChattingControllerTest {

    @Autowired
    private ChattingService chattingService;

    @Test
    @DisplayName("채팅방 입장 컨트롤러 테스트")
    void enterChatRoom() {
        RoomRequestDTO roomReq = RoomRequestDTO.builder().company("라인").roomId("1T57J98").userId(3L).build();
        given(chattingService.enterChatRoom(roomReq)).willReturn("라인");
    }

    @Test
    void pubMessage() {
    }
}