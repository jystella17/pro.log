package com.b112.prolog.process.Dto;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


@Getter
@Setter
public class QnaDto {

    @Id
    private ObjectId id;
    private String question;
    private String answer;
    private String company;
    private String start_date;


}
