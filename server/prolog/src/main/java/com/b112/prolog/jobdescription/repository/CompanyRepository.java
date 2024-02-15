package com.b112.prolog.jobdescription.repository;

import com.b112.prolog.jobdescription.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

     List<Company> findByCompanyName(String companyName);

     List<Company> findByCompanyNameContaining(String companyName);

}
