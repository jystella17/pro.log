package com.b112.prolog.jobDescription.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class JobDescriptionDto {

    private Long jdId;
    private int companyId;
    private String jobType;
    private String position;
    private String experience;
    private String education;
    private String workingArea;
    private String link;
    private String keyword;
    private String openingDate;
    private String expirationDate;
    private String jobTitle;
    private String industry;
    private String jobMidCode;
}

