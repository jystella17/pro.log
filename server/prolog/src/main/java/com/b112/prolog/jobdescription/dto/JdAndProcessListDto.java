package com.b112.prolog.jobdescription.dto;


import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.process.entity.Process;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter @Setter
@ToString
public class JdAndProcessListDto {

    private List<JobDescription> jd;
    private List<Process> process;





}
