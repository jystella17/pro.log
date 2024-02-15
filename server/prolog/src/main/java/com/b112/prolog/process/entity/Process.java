package com.b112.prolog.process.entity;

import com.b112.prolog.process.dto.Template;

import java.util.ArrayList;
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
    private int end_status;
    private String step;
    private String progress;
    private List<String> tag;
    private String start_date;
    private String end_date;
    private List<Template> essay;
    private List<Template> test;
    private List<Template> interview;
    private int jd_id;
    private String jdName;

    @Builder
    public Process(String id, String company, int end_status, String step, String progress,
                   List<String> tag, String start_date, String end_date, List<Template> essay,
                   List<Template> test, List<Template> interview, int jd_id, String jdName) {
        this.id = id;
        this.company = company;
        this.end_status = end_status;
        this.step = step;
        this.progress = progress;
        this.tag = tag;
        this.start_date = start_date;
        this.end_date = end_date;
        this.essay = (essay != null) ? essay : new ArrayList<>();
        this.test = (test != null) ? test : new ArrayList<>();
        this.interview = (interview != null) ? interview : new ArrayList<>();
        this.jd_id = jd_id;
        this.jdName = jdName;
    }

    public void updateTemplates(List<Template> essay, List<Template> test, List<Template> interview) {
        this.essay = essay;
        this.test = test;
        this.interview = interview;
    }
}
