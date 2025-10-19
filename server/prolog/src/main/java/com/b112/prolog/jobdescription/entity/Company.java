package com.b112.prolog.jobdescription.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "company")
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(name = "name")
    private String companyName;

    @Builder
    public Company(String companyName) {
        this.companyName = companyName;
    }
}
