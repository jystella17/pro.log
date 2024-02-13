package com.b112.prolog.process.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum TemplateType {

    QNA(1, "자기소개서"),
    CODINGTEST(2, "코딩테스트"),
    TOGGLE(3, "면접"),
    MEMO(4, "자유양식");

    private final int code;
    private final String displayName;

    public static TemplateType of(int code) {
        return Arrays.stream(TemplateType.values())
                .filter(r -> r.getCode() == code)
                .findAny()
                .orElse(MEMO);
    }
}
