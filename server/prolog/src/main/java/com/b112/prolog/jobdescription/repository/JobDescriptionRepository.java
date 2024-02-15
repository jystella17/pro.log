package com.b112.prolog.jobdescription.repository;

import com.b112.prolog.jobdescription.entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {

    List<JobDescription> findByJobTitle (String title);

    List<JobDescription> findByJobTitleContaining(String title);

    List<JobDescription> findAllByOpeningDateStartingWithOrExpirationDateStartingWith(String openingDate, String expirationDate);
}