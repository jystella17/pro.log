package com.b112.prolog.chat.repository;

import com.b112.prolog.chat.entity.Chatting;
import org.json.JSONObject;
import org.json.JSONException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDateTime;

@SpringBootTest
public class RedisRepositoryTest {

    @Autowired
    private RedisRepository repository;

    @Test
    @DisplayName("채팅방 입장 테스트")
    void addChatRoomTest() {
        String roomId = "E3XT017";
        Long userId = 1L;
        repository.addChatRoom(roomId, userId.toString());

        roomId = "U92Y306"; userId = 2L;
        repository.addChatRoom(roomId, userId.toString());
    }

    @Test
    @DisplayName("특정 유저가 특정 채팅방에 존재하는지 테스트")
    void isUserInRoomTest() {
        String roomId = "U92Y306";

        String user = repository.isUserInRoom(roomId);
        Assertions.assertThat(user).isEqualTo("2");
    }

    @Test
    @DisplayName("채팅방 나가기 테스트")
    void delFromChatRoomTest() {
        String roomId = "U92Y306";
        Long uid = 2L;

        repository.delFromChatRoom(roomId, uid.toString());
        String user = repository.isUserInRoom(roomId);
        Assertions.assertThat(user).isEqualTo(null);
    }

    @Test
    @DisplayName("채팅 PUB 테스트")
    void newChattingMsgTest() throws JSONException {
        Long uid = 1L;
        Chatting msg = Chatting.builder().userId(uid.toString()).message("B112 Prolog")
                .createdAt(LocalDateTime.now()).build();

        JSONObject object = new JSONObject();
        object.put("chatId", msg.getChatId());
        object.put("userId", msg.getUserId());
        object.put("msg", msg.getMessage());
        object.put("time", msg.getCreatedAt());

        repository.newChattingMsg("E3XT017", object.toString());
    }
}
