package com.b112.prolog.user.controller;

import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.service.MasterQnaService;
import com.b112.prolog.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/api/cover-letter")
@RestController
public class MasterQnaController {

    private final UserService userService;
    private final MasterQnaService masterQnaService;

    public MasterQnaController(UserService userService, MasterQnaService masterQnaService) {
        this.userService = userService;
        this.masterQnaService = masterQnaService;
    }

    @GetMapping
    public ResponseEntity<?> getAllQnas(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Qna> qnas = masterQnaService.findAll(userPrincipal);
        return ResponseEntity.ok().body(qnas);
    }

    @PostMapping
    public ResponseEntity<?> createMasterQna(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                             @RequestBody Qna masterQna) {
        String id = masterQnaService.createMasterQna(masterQna);
        userService.updateUserQna(id);
        return ResponseEntity.ok().body(id);
    }

    @PutMapping
    public ResponseEntity<?> editMasterQna(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                           @RequestBody Map<String, String> map) {
        String id = masterQnaService.updateMasterQna(map);
        return ResponseEntity.ok().body(id);
    }


    // RequestBody Json의 id필드 key는 항상 id여야 합니다.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMasterQna(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                             @PathVariable String id) {
        masterQnaService.deleteMasterQnaById(id);
        userService.deleteUserQna(id);

        return ResponseEntity.ok().build();
    }

}
