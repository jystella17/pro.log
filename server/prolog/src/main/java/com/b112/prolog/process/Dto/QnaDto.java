package com.b112.prolog.process.Dto;

import com.b112.prolog.process.Entity.Qna;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


@Getter
@Setter
@RequiredArgsConstructor
public class QnaDto {

    @Id
    private ObjectId id;
    private String question;
    private String answer;
    private String company;
    private String start_date;

    public QnaDto toDto(Qna qna) {
        QnaDto qnaDto = new QnaDto();
        qnaDto.setId(qna.getId());
        qnaDto.setQuestion(qna.getQuestion());
        qnaDto.setAnswer(qna.getAnswer());
        qnaDto.setCompany(qna.getCompany());
        qnaDto.setStart_date(qna.getStart_date());
        return qnaDto;
    }


}
