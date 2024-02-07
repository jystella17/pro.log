package com.b112.prolog.jobDescription.Dto;


import com.b112.prolog.jobDescription.Entity.JobDescription;
import com.b112.prolog.process.Entity.Process;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Optional;

@Getter @Setter
@ToString
public class JdAndProcessListDto {

    private List<JobDescription> jd;
    private List<Process> process;





}
