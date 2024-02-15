package com.b112.prolog.process.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CodingTestDto {

    private final boolean isSolved;
    private final String algorithm;
    private final int level;
    private final String memo;

    @Builder
    public CodingTestDto(boolean isSolved, String algorithm, int level, String memo) {
        this.isSolved = isSolved;
        this.algorithm = (!algorithm.isEmpty()) ? algorithm : "";
        this.level = level;
        this.memo = (!memo.isEmpty()) ? memo : "";
    }
}
