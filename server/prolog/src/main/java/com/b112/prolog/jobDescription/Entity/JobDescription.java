package com.b112.prolog.jobDescription.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Table(name ="JD")
@NoArgsConstructor
@ToString
public class JobDescription {

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jdId;

    @Column(name="company_id")
    private int companyId;

    @Column(name="link")
    private String link;

    @Column(name="keyword")
    private String keyword;

    private String openingTimestamp;

    private String expirationTimestamp;

    private String companyName;

    @Column(name="job_title")
    private String jobTitle;

    private String industryName;

    @Column(name="working_area")
    private String workingArea;

    @Column(name="job_type")
    private String jobType;

    private String jobMidCodeName;

    @Column(name="experience")
    private String experience;

    @Column(name="education")
    private String education;







}

