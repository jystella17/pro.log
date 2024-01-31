package com.b112.prolog.jobDescription.Repository;

import com.b112.prolog.jobDescription.Entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {


}
