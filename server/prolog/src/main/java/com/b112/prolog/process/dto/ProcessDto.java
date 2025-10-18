package com.b112.prolog.process.dto;

import lombok.Getter;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ProcessDto {

    private String id;
    private String company;
    private int endStatus;
    private String step;
    private String progress;
    private List<String> tag;
    private LocalDateTime startFrom;
    private LocalDateTime endTo;
    private List<Template> essay;
    private List<Template> test;
    private List<Template> interview;
    private int jdId;

    public ProcessDto() {}

    @Builder
    public ProcessDto(String id, String company, int endStatus, String step, String progress, List<String> tag,
                      LocalDateTime startFrom, LocalDateTime endTo, List<Template> essay, List<Template> test,
                      List<Template> interview, int jdId) {
        this.id = id;
        this.company = company;
        this.endStatus = endStatus;
        this.step = step;
        this.progress = progress;
        this.tag = tag;
        this.startFrom = startFrom;
        this.endTo = endTo;
        this.essay = essay;
        this.test = test;
        this.interview = interview;
        this.jdId = jdId;
    }

    @Builder
    public ProcessDto(String company, int endStatus, String step, String progress, List<String> tag,
                      LocalDateTime startFrom, LocalDateTime endTo, List<Template> essay, List<Template> test,
                      List<Template> interview, int jdId) {
        this.company = company;
        this.endStatus = endStatus;
        this.step = step;
        this.progress = progress;
        this.tag = tag;
        this.startFrom = startFrom;
        this.endTo = endTo;
        this.essay = essay;
        this.test = test;
        this.interview = interview;
        this.jdId = jdId;
    }
}
