package com.b112.prolog.jobdescription.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CompanyDto {

    private final Long companyId;
    private final String companyName;

    public CompanyDto(Long companyId, String companyName) {
        this.companyId = companyId;
        this.companyName = companyName;
    }
}
