package com.b112.prolog.process.Dto;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Template {

    private int template_type;
    private String template_name;
    private List<ObjectId> content;// 이거를 QNA DTO로 바꾸자 !!!!!!!!
    private List<QnaDto> populatecontent;



}
