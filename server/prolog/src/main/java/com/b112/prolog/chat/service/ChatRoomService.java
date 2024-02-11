package com.b112.prolog.chat.service;

import com.b112.prolog.chat.entity.ChatRoom;
import com.b112.prolog.chat.dto.ChatRoomResponse;
import com.b112.prolog.chat.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public List<ChatRoomResponse> allExistChatRooms() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        return dtoConverter(chatRooms);
    }

    /*
    TODO: 회사 이름으로 채팅방 검색
     */
    public ChatRoomResponse searchChatRoomByCompany(String company) {
        ChatRoom chatRoom = chatRoomRepository.findByCompany(company).orElseThrow();

        return ChatRoomResponse.builder().roomId(chatRoom.getRoomId()).company(chatRoom.getCompany())
                .numParticipants(chatRoom.getNumParts()).lastChat(chatRoom.getLastChat()).build();
    }

    /*
    TODO: 참여인원 순으로 채팅방 정렬
     */
    public List<ChatRoomResponse> sortByParticipants() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllOrderByNumParts(0);
        return dtoConverter(chatRooms);
    }

    /*
    TODO: 회사 이름 순으로 채팅방 정렬
     */
    public List<ChatRoomResponse> sortByCompanyName() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllOrderByCompany("A");
        return dtoConverter(chatRooms);
    }

    /*
    TODO: 최근 채팅 순으로 채팅방 정렬
     */
    public List<ChatRoomResponse> sortByLastChat() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllOrderByLastChat(LocalDateTime.now());
        return dtoConverter(chatRooms);
    }

    public List<ChatRoomResponse> dtoConverter(List<ChatRoom> chatRooms) {
        List<ChatRoomResponse> responses = new ArrayList<>();

        for(ChatRoom cr : chatRooms) {
            ChatRoomResponse res = ChatRoomResponse.builder().roomId(cr.getRoomId()).company(cr.getCompany())
                    .numParticipants(cr.getNumParts()).lastChat(cr.getLastChat()).build();

            responses.add(res);
        }
        return responses;
    }
}
