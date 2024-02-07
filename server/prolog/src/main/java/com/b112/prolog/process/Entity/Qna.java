package com.b112.prolog.process.Entity;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Document(collection = "qna")
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
    public Qna(String id, String question, String answer, String company, String start_date) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.company = company;
        this.start_date = start_date;
    }
}
