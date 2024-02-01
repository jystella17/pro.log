package com.b112.prolog.jobDescription.Repository;

import com.b112.prolog.jobDescription.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

     List<Company> findByCompanyName(String companyName);

     List<Company> findByCompanyNameContaining(String companyName);

}
