package com.b112.prolog.process.dto;

import com.b112.prolog.process.entity.Qna;

import lombok.*;
import org.springframework.context.annotation.Bean;

@Getter
public class QnaDto {

    private String id;
    private String question;
    private String answer;
    private String company;
    private String start_date;

    @Builder
    public QnaDto(String id, String question, String answer, String company, String start_date) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.company = company;
        this.start_date = start_date;
    }

    public QnaDto toDto(Qna qna) {
        return QnaDto.builder().id(qna.getId()).question(qna.getQuestion()).answer(qna.getAnswer())
                .company(qna.getCompany()).start_date(qna.getStart_date()).build();
    }
}
