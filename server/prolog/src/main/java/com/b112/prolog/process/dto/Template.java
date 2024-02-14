package com.b112.prolog.process.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Template {

    private int template_type;
    private String template_name;
    private List<QnaDto> content;

    @Builder
    public Template(int template_type, String template_name, List<QnaDto> content) {
        this.template_type = template_type;
        this.template_name = template_name;
        this.content = content;
    }
}
