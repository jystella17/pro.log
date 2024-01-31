package com.b112.prolog.jobDescription.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Table(name ="Company")
@NoArgsConstructor
@ToString
public class Company {

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(name="name")
    private String companyName;

    @Builder
    public Company(Long companyId, String companyName) {
        this.companyId = companyId;
        companyName = companyName;
    }

}

