package com.b112.prolog.jobdescription.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name ="Company")
@RequiredArgsConstructor
@ToString
public class Company {

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(name="name")
    private String companyName;

//    @OneToMany(mappedBy = "company")
//    private List<JobDescription> jobDescriptions = new ArrayList<>();

    @Builder
    public Company(Long companyId, String companyName) {
        this.companyId = companyId;
        this.companyName = companyName;
    }

}

