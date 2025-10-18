package com.b112.prolog.process.controller;

import com.b112.prolog.process.dto.QnaDto;
import com.b112.prolog.process.service.QnaService;

import com.b112.prolog.user.entity.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QnaController {

    private final QnaService qnaService;

    public QnaController(QnaService qnaService) {
        this.qnaService = qnaService;
    }

    /**?
     * QNA처음 생성시 Qna collection에 해당 값 저장 후 생성된 oid process의 해당 step의 [] 에 저장
     ** TBD : User의 자소서[] 에도 oid 추가할 것.
     * @param step 어떤 유형 essay , test, interview 에 추가할건지
     * @param index 해당 유형의 몇번째 template인지
     */
    @PostMapping("/{processid}/{step}/{index}/qna")
    public ResponseEntity<?> insertQnA(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @RequestBody QnaDto dto, @PathVariable String processid,
                                       @PathVariable String step, @PathVariable int index){
        try{
            return new ResponseEntity<>(qnaService.insertQnA(dto,processid,step,index),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    /**?
     * 바뀐 QnA들의 리스트를 받으면 QnA 컬렉션 업데이트
     * @param dtos 바뀐 QnaDto들의 리스트
     */
    @PutMapping("/qna")
    public ResponseEntity<?> updateQnA(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @RequestBody List<QnaDto> dtos){
        try{
            return new ResponseEntity<>(qnaService.updateQna(dtos),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/qna/search/{keyword}")
    public ResponseEntity<?> searchByKeyword(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                             @PathVariable String keyword){
        try {
            return new ResponseEntity<>(qnaService.searchQnaByKeyword(keyword),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }
}
