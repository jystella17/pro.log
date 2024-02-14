package com.b112.prolog.user.controller;

import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.user.service.MasterQnaService;
import com.b112.prolog.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@RequestMapping("/api/cover-letter")
@RestController
public class MasterQnaController {
    private final UserService userService;
    private final MasterQnaService masterQnaService;

    @GetMapping
    public ResponseEntity<?> getAllQnas() {
        List<Qna> qnas = masterQnaService.findAll();
        return ResponseEntity.ok().body(qnas);
    }

    @PostMapping
    public ResponseEntity<?> createMasterQna(@RequestBody Qna masterQna) {
        String id = masterQnaService.createMasterQna(masterQna);
        userService.updateUserQna(id);
        return ResponseEntity.ok().body(id);
    }

    @PutMapping
    public ResponseEntity<?> editMasterQna(@RequestBody Map<String, String> map) {
        String id = masterQnaService.updateMasterQna(map);
        return ResponseEntity.ok().body(id);
    }


    // 프론트에서 요청할 때 json을 적을 때 id는 전부 "id" 로 보내야한다!!!
    // "_id"로 보내면 못읽음
    @DeleteMapping
    public ResponseEntity<?> deleteMasterQna(@RequestBody Qna masterQna) {
        masterQnaService.deleteMasterQna(masterQna);
        userService.deleteUserQna(masterQna.getId());

        return ResponseEntity.ok().build();
    }

}
