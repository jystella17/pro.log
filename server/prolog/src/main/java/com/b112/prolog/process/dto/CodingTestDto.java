package com.b112.prolog.process.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CodingTestDto {

    private final boolean isSolved;
    private final List<String> algorithm;
    private final String level;
    private final String memo;

    @Builder
    public CodingTestDto(boolean isSolved, List<String> algorithm, String level, String memo) {
        this.isSolved = isSolved;
        this.algorithm = (!algorithm.isEmpty()) ? algorithm : new ArrayList<>();
        this.level = (!level.isEmpty()) ? level : "";
        this.memo = (!memo.isEmpty()) ? memo : "";
    }
}
