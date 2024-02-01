package com.b112.prolog.process.Entity;

import com.b112.prolog.process.Dto.Template;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Getter
@Document(collection = "process")
public class Process {

    @Id
    private ObjectId id;
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

    @Builder
    public Process(ObjectId id, String company, int end_status, String step, String progress, List<String> tag, String start_date, String end_date, List<Template> essay, List<Template> test, List<Template> interview, int jd_id) {
        this.id = id;
        this.company = company;
        this.end_status = end_status;
        this.step = step;
        this.progress = progress;
        this.tag = tag;
        this.start_date = start_date;
        this.end_date = end_date;
        this.essay = essay;
        this.test = test;
        this.interview = interview;
        this.jd_id = jd_id;
    }
}
