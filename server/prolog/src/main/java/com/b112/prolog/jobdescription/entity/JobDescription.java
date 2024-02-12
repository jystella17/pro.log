package com.b112.prolog.jobdescription.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Table(name ="JobDescription")
@NoArgsConstructor
@ToString
public class JobDescription {

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jdId;

    @Column(name="link")
    private String link;

    @Column(name="keyword")
    private String keyword;

    @Column(name="openingDate")
    private String openingDate;

    @Column(name ="expirationDate")
    private String expirationDate;

//    @Column(name="companyName")
//    private String companyName;


    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;

    @Column(name="job_title")
    private String jobTitle;

    @Column(name="industry")
    private String industry;

    @Column(name="working_area")
    private String workingArea;

    @Column(name="job_type")
    private String jobType;

    @Column(name="jobMidCode")
    private String jobMidCode;

    @Column(name="experience")
    private String experience;

    @Column(name="education")
    private String education;


    @Builder
    public JobDescription(String link, String keyword, String openingDate, String expirationDate, Company company, String jobTitle, String industry, String workingArea, String jobType, String jobMidCode, String experience, String education) {
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
    }
}

