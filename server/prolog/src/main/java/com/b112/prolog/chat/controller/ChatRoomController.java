package com.b112.prolog.chat.controller;

import com.b112.prolog.chat.dto.ChatRoomResponse;
import com.b112.prolog.chat.service.ChatRoomService;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatting/room")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/list")
    public ResponseEntity<List<ChatRoomResponse>> allExistChatRooms() {
        return ResponseEntity.ok(chatRoomService.allExistChatRooms());
    }

    @GetMapping("/search")
    public ResponseEntity<ChatRoomResponse> searchByCompany(@RequestParam("companyName") String companyName) {
        return ResponseEntity.ok(chatRoomService.searchChatRoomByCompany(companyName));
    }

    @GetMapping("/list/order/participants")
    public ResponseEntity<List<ChatRoomResponse>> sortByParticipants() {
        return ResponseEntity.ok(chatRoomService.sortByParticipants());
    }

    @GetMapping("/list/order/company")
    public ResponseEntity<List<ChatRoomResponse>> sortByCompanyName() {
        return ResponseEntity.ok(chatRoomService.sortByCompanyName());
    }

    @GetMapping("/list/order/last-chat")
    public ResponseEntity<List<ChatRoomResponse>> sortByLastChat() {
        return ResponseEntity.ok(chatRoomService.sortByLastChat());
    }
}
