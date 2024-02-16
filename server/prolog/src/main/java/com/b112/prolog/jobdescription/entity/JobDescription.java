package com.b112.prolog.jobdescription.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Table(name = "job_description")
@NoArgsConstructor
@ToString
public class JobDescription {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jdId;

    @Column(name = "link")
    private String link;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "opening_date")
    private String openingDate;

    @Column(name = "expiration_date")
    private String expirationDate;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "industry")
    private String industry;

    @Column(name = "working_area")
    private String workingArea;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "job_mid_code")
    private String jobMidCode;

    @Column(name = "experience")
    private String experience;

    @Column(name = "education")
    private String education;

    @Column(name = "close_code")
    private String closeTypeCode;

    @Builder
    public JobDescription(Long jdId, String link, String keyword, String openingDate, String expirationDate, Company company, String jobTitle, String industry, String workingArea, String jobType, String jobMidCode, String experience, String education, String closeTypeCode) {
        this.jdId = jdId;
        this.link = link;
        this.keyword = keyword;
        this.openingDate = openingDate;
        this.expirationDate = expirationDate;
        this.company = company;
        this.jobTitle = jobTitle;
        this.industry = industry;
        this.workingArea = workingArea;
        this.jobType = jobType;
        this.jobMidCode = jobMidCode;
        this.experience = experience;
        this.education = education;
        this.closeTypeCode = closeTypeCode;
    }
}