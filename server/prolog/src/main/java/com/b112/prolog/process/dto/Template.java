package com.b112.prolog.process.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class Template {

    private int templateType;
    private String templateName;
    private List<QnaDto> qnaList;
    private List<CodingTestDto> codingTestList;
    private List<ToggleDto> toggleList;
    private List<String> memoList;

    @Builder
    public Template(int templateType, String templateName, List<QnaDto> qnaList, List<CodingTestDto> codingTestList,
                    List<ToggleDto> toggleList, List<String> memoList) {
        this.templateType = templateType;
        this.templateName = templateName;
        this.qnaList = (!qnaList.isEmpty()) ? qnaList : new ArrayList<>();
        this.codingTestList = (!codingTestList.isEmpty()) ? codingTestList : new ArrayList<>();
        this.toggleList = (!toggleList.isEmpty()) ? toggleList : new ArrayList<>();
        this.memoList = (!memoList.isEmpty()) ? memoList : new ArrayList<>();
    }
}
