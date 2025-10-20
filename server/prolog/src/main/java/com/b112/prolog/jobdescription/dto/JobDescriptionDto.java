package com.b112.prolog.jobdescription.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class JobDescriptionDto {

    private final String companyName;
    private final String jobType;
    private final String position;
    private final String experience;
    private final String education;
    private final String workingArea;
    private final String link;
    private final String keyword;
    private final String openingDate;
    private final String expirationDate;
    private final String jobTitle;
    private final String industry;
    private final String closeTypeCode;

    @Builder
    public JobDescriptionDto(String companyName, String jobType, String position, String experience, String education,
                             String workingArea, String link, String keyword, String openingDate, String expirationDate,
                             String jobTitle, String industry, String closeTypeCode) {
        this.companyName = companyName;
        this.jobType = jobType;
        this.position = position;
        this.experience = experience;
        this.education = education;
        this.workingArea = workingArea;
        this.link = link;
        this.keyword = keyword;
        this.openingDate = openingDate;
        this.expirationDate = expirationDate;
        this.jobTitle = jobTitle;
        this.industry = industry;
        //this.jobMidCode = jobMidCode;
        this.closeTypeCode = closeTypeCode;
    }

    public String getYear() {
        return openingDate.substring(0, 4);
    }

    public String getMonth() {
        return openingDate.substring(5, 7);
    }
}

