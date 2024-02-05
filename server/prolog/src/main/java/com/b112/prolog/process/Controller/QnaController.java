package com.b112.prolog.process.Controller;


import com.b112.prolog.process.Dto.QnaDto;
import com.b112.prolog.process.Service.QnaService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QnaController {
    private final QnaService qnaService;


    /*
    * QNA처음 생성시 Qna collection에 해당 값 저장 후 생성된 oid process의 essay[] 에 저장
    * TBD : User의 자소서[] 에도 oid 추가할 것.
    * */
    @PostMapping("/{processid}/qna")
    public String insertProcess(@RequestBody QnaDto dto, @PathVariable ObjectId processid){
//        ObjectId oid = qnaService.insertQnA(dto,processid);
        ObjectId oid = qnaService.insertQnA(dto,processid);
        System.out.println(oid+" @@######oidddddd");
        return oid.toString();
    }

}
