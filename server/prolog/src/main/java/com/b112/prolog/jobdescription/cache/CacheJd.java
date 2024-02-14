package com.b112.prolog.jobdescription.cache;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CacheJd {

    private int year;
    private int month;

    private Long jdId;
    private String link;
    private String keyword;
    private String openingDate;
    private String expirationDate;
    private Long companyId;
    private String companyName;
    private String jobTitle;
    private String industry;
    private String workingArea;
    private String jobType;
    private String jobMidCode;
    private String experience;
    private String education;
    private int closeTypeCode;

    private LocalDateTime expTime;

    public CacheJd() {
    }

    @Builder
    public CacheJd(Long jdId, String link, String keyword, String openingDate, String expirationDate,
                   Long companyId, String companyName, String jobTitle, String industry, String workingArea,
                   String jobType, String jobMidCode, String experience, String education, int closeTypeCode) {

        this.year = Integer.parseInt(openingDate.substring(0, 3));
        this.month = Integer.parseInt(openingDate.substring(5, 6));
        this.jdId = jdId;
        this.link = link;
        this.keyword = keyword;
        this.openingDate = openingDate;
        this.expirationDate = expirationDate;
        this.companyId = companyId;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.industry = industry;
        this.workingArea = workingArea;
        this.jobType = jobType;
        this.jobMidCode = jobMidCode;
        this.experience = experience;
        this.education = education;
        this.closeTypeCode = closeTypeCode;
        this.expTime = LocalDateTime.parse(openingDate).plusYears(3);
    }
}
