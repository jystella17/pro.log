package com.b112.prolog.jobDescription.Dto;


import com.b112.prolog.jobDescription.Entity.JobDescription;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Optional;

@Getter @Setter
@ToString
public class JdAndProcessListDto {

    private Optional<JobDescription> jd;
    private Optional<Process> process;





}
