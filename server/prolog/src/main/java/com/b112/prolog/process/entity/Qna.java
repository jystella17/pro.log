package com.b112.prolog.process.entity;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "qna")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Qna {

    @Id
    private String id;
    @Column(unique = true)
    private String question;
    @Column(unique = true)
    private String answer;
    private String company;
    private String start_date;

    @Builder
    public Qna(String question, String answer, String company, String start_date) {
        this.question = question;
        this.answer = answer;
        this.company = company;
        this.start_date = start_date;
    }
}
