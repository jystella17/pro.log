package com.b112.prolog.process.Controller;


import com.b112.prolog.process.Dto.QnaDto;
import com.b112.prolog.process.Service.QnaService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QnaController {
    private final QnaService qnaService;

    /**?
     * QNA처음 생성시 Qna collection에 해당 값 저장 후 생성된 oid process의 해당 step의 [] 에 저장
     ** TBD : User의 자소서[] 에도 oid 추가할 것.
     * @param step 어떤 유형 essay , test, interview 에 추가할건지
     * @param index 해당 유형의 몇번째 template인지
     */
    @PostMapping("/{processid}/{step}/{index}/qna")
    public String insertQnA(@RequestBody QnaDto dto, @PathVariable ObjectId processid, @PathVariable String step,@PathVariable int index){
//        ObjectId oid = qnaService.insertQnA(dto,processid);
        String oid = qnaService.insertQnA(dto,processid,step,index);
//        System.out.println(oid+" @@######oidddddd");
        return oid;
    }

    /**?
     * 바뀐 QnA들의 리스트를 받으면 QnA 컬렉션 업데이트
     * @param dtos 바뀐 QnaDto들의 리스트
     */
    @PutMapping("/qna")
    public void updateQnA(@RequestBody List<QnaDto> dtos){
        qnaService.updateQna(dtos);
    }

}
