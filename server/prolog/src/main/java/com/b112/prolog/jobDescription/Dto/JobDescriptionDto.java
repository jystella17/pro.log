package com.b112.prolog.jobDescription.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobDescriptionDto {

    private Long jdId;
    private int companyId;
    private String jobType;
    private String position;
    private String experience;
    private String education;
    private String workingArea;
}

