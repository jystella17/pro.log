package com.b112.prolog.process.service;

import com.b112.prolog.process.dto.QnaDto;
import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.process.repository.ProcessRepository;
import com.b112.prolog.process.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
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

    public String insertQnA(QnaDto dto, String oid, String step, int index){
        Qna qna = qnaRepository.save(Qna.builder().question(dto.getQuestion()).answer(dto.getAnswer())
                    .company(dto.getCompany()).start_date(dto.getStart_date()).build());

        QnaDto qnaDto = QnaDto.builder().id(qna.getId()).question(qna.getQuestion()).answer(qna.getAnswer())
                .company(qna.getCompany()).start_date(qna.getStart_date()).build();

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        String target = step+"."+index+"."+"qnaList";
//        u.push(target,qid.getId());
        u.push(target, qnaDto);
//        u.set(step,)
        // Process id의 essay[]에 추가한 Qna ObjectId insert

        processRepository.updateTemplate(q,u, Process.class);

        //TBD USER의 자소서 Array에도 qid추가 해야함 .
        return qna.getId();
    }

    /*
    * QnA가 수정되면 호출되어서 update수행
    * */
    public int updateQna(List<QnaDto> qnaDtos){
        for(QnaDto qnaDto : qnaDtos){
            String oid = qnaDto.getId();
            Query q = new Query(Criteria.where("_id").is(oid));
            Update u = new Update();

            u.set("company", qnaDto.getCompany());
            u.set("question", qnaDto.getQuestion());
            u.set("answer", qnaDto.getAnswer());
            u.set("start_date", qnaDto.getStart_date());

            qnaRepository.updateTemplate(q, u, Qna.class);
        }
        return 1;
    }

    public List<QnaDto> searchQnaByKeyword(String keyword){
        Query query = new Query(Criteria.where("question").regex(keyword));
        return qnaRepository.find(query,"qna");
    }
}
