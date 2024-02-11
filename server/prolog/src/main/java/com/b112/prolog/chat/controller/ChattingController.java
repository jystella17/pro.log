package com.b112.prolog.chat.controller;

import com.b112.prolog.chat.dto.PubMessageDTO;
import com.b112.prolog.chat.dto.RoomRequestDTO;
import com.b112.prolog.chat.service.ChattingService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChattingController {

    private final ChattingService chatService;

    @MessageMapping("/chat/room") // 실제 경로 : /pub/chat/room
    public void enterChatRoom(RoomRequestDTO roomRequest) {
        String company = chatService.enterChatRoom(roomRequest);
        log.info(company);
    }

    @MessageMapping("/chat/message") // 실제 경로 : /pub/chat/message
    public void pubMessage(PubMessageDTO pubMessage) {
        Long response = chatService.sendChatting(pubMessage);
        log.info(String.valueOf(response));
    }
}
