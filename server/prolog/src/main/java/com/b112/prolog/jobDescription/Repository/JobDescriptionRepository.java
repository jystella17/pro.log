package com.b112.prolog.jobDescription.Repository;

import com.b112.prolog.jobDescription.Entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {

    List<JobDescription> findByJobTitle (String title);

    List<JobDescription> findByJobTitleContaining(String title);



}
