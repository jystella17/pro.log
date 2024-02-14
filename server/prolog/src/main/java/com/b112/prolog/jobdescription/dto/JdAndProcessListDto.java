package com.b112.prolog.jobdescription.dto;


import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.process.entity.Process;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class JdAndProcessListDto {

    private List<JobDescription> jd;
    private List<Process> process;

    @Builder
    public JdAndProcessListDto(List<JobDescription> jd, List<Process> process) {
        this.jd = jd;
        this.process = process;
    }
}
