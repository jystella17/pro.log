package com.b112.prolog.process.Service;

import com.b112.prolog.process.Dto.QnaDto;
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


@RequiredArgsConstructor
@Service
public class QnaService {
    private final QnaRepository qnaRepository;
    private final ProcessRepository processRepository;

    public ObjectId insertQnA(QnaDto dto, ObjectId oid){
        Qna qna = Qna.builder()
                .question(dto.getQuestion())
                .answer(dto.getAnswer())
                .company(dto.getCompany())
                .start_date(dto.getStart_date())
                .build();

        Qna qid = qnaRepository.save(qna);


        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        u.push("essay",qid.getId());
        // Process id의 essay[]에 추가한 Qna ObjectId insert
//        qnaRepository.updateTemplate(q,u,Process.class);
        processRepository.updateTemplate(q,u, Process.class);

        //TBD USER의 자소서 Array에도 qid추가 해야함 .
//        System.out.println(qid.getId() + "         "+ qid.getId().getClass());
        return qid.getId();

    }
}
