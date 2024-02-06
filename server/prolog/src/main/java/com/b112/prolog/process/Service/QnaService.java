package com.b112.prolog.process.Service;

import com.b112.prolog.process.Dto.QnaDto;
import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Entity.Qna;
import com.b112.prolog.process.Repository.ProcessRepository;
import com.b112.prolog.process.Repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class QnaService {
    private final QnaRepository qnaRepository;
    private final ProcessRepository processRepository;

    public ObjectId insertQnA(QnaDto dto, ObjectId oid,String step,int index){
        Qna qna = Qna.builder()
                .question(dto.getQuestion())
                .answer(dto.getAnswer())
                .company(dto.getCompany())
                .start_date(dto.getStart_date())
                .build();

        Qna qid = qnaRepository.save(qna);

        QnaDto qnaDto = new QnaDto();
        qnaDto.setId(qid.getId());
        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        String target = step+"."+index+"."+"content";
//        u.push(target,qid.getId());
        u.push(target,qnaDto);
//        u.set(step,)
        // Process id의 essay[]에 추가한 Qna ObjectId insert

        processRepository.updateTemplate(q,u, Process.class);

        //TBD USER의 자소서 Array에도 qid추가 해야함 .
        return qid.getId();
    }

    /*
    * QnA가 수정되면 호출되어서 update수행
    * */
    public int updateQna(List<QnaDto> qnaDtos){
        for(QnaDto qnaDto : qnaDtos){
            ObjectId oid = qnaDto.getId();
            Query q = new Query(Criteria.where("_id").is(oid));
            Update u = new Update();
            u.set("question",qnaDto.getQuestion());
            u.set("answer",qnaDto.getAnswer());
            qnaRepository.updateTemplate(q,u,Qna.class);

        }

        return 1;
    }
}
