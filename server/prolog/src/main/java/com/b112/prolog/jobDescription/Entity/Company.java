package com.b112.prolog.jobDescription.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

