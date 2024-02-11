package com.b112.prolog.chat.repository;

import com.b112.prolog.chat.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {

    Optional<ChatRoom> findByCompany(String company);

    List<ChatRoom> findAllOrderByCompany(String company);

    List<ChatRoom> findAllOrderByLastChat(LocalDateTime lastChat);

    List<ChatRoom> findAllOrderByNumParts(int numParts);
}
