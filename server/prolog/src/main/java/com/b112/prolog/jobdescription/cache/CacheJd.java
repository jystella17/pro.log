package com.b112.prolog.jobdescription.cache;

import com.b112.prolog.jobdescription.entity.JobDescription;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CacheJd {

    private String calendar;
    private String year;
    private String month;

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
    private String closeTypeCode;

    private LocalDateTime expTime;

    public CacheJd() {
    }

    @Builder
    public CacheJd(Long jdId, String link, String keyword, String openingDate, String expirationDate,
                   Long companyId, String companyName, String jobTitle, String industry, String workingArea,
                   String jobType, String jobMidCode, String experience, String education, String closeTypeCode) {

        this.year = openingDate.substring(0, 3);
        this.month = openingDate.substring(5, 6);
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

    public CacheJd(JobDescription jd) {
        this.year = jd.getOpeningDate().substring(0, 3);
        this.month = jd.getOpeningDate().substring(5, 6);
        this.jdId = jd.getJdId();
        this.link = jd.getLink();
        this.keyword = jd.getKeyword();
        this.openingDate = jd.getOpeningDate();
        this.expirationDate = jd.getExpirationDate();
        this.companyId = jd.getCompany().getCompanyId();
        this.companyName = jd.getCompany().getCompanyName();
        this.jobTitle = jd.getJobTitle();
        this.industry = jd.getIndustry();
        this.workingArea = jd.getWorkingArea();
        this.jobType = jd.getJobType();
        this.experience = jd.getExperience();
        this.education = jd.getEducation();
        this.closeTypeCode = jd.getCloseTypeCode();
        this.expTime = LocalDateTime.parse(jd.getOpeningDate()).plusYears(3);
    }
}
