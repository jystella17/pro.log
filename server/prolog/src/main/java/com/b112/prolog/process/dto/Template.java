package com.b112.prolog.process.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Template {

    private int template_type;
    private String template_name;
    private List<QnaDto> content;// 이거를 QNA DTO로 바꾸자 !!!!!!!!
//    private List<Qna> populatecontent;



}
