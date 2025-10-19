package com.b112.prolog.process.entity;

import com.b112.prolog.process.dto.Template;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.Assert;

@Getter
@Document(collection = "process")
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Process {

    @Id
    private String id;
    private String company;
    private int endStatus;
    private String step;
    private String progress;
    private List<String> tag;
    private String startFrom;
    private String endTo;
    private List<Template> essay;
    private List<Template> test;
    private List<Template> interview;
    private int jdId;
    private String jdName;

    @Builder
    public Process(String id, String company, int endStatus, String step, String progress,
                   List<String> tag, String startFrom, String endTo, List<Template> essay,
                   List<Template> test, List<Template> interview, int jdId, String jdName) {
        this.id = id;
        this.company = company;
        this.endStatus = endStatus;
        this.step = step;
        this.progress = progress;
        this.tag = tag;
        this.startFrom = startFrom;
        this.endTo = endTo;
        this.essay = (essay != null) ? essay : new ArrayList<>();
        this.test = (test != null) ? test : new ArrayList<>();
        this.interview = (interview != null) ? interview : new ArrayList<>();
        this.jdId = jdId;
        this.jdName = jdName;
    }

    public void updateTemplates(List<Template> essay, List<Template> test, List<Template> interview) {
        this.essay = essay;
        this.test = test;
        this.interview = interview;
    }
}
