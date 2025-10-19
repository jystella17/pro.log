package com.b112.prolog.jobdescription.service;

import com.b112.prolog.jobdescription.entity.Company;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.jobdescription.repository.CompanyRepository;
import com.b112.prolog.jobdescription.repository.JobDescriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Slf4j
@Component
public class JobDescriptionDataGenerator implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final Random random = new Random();

    public JobDescriptionDataGenerator(CompanyRepository companyRepository,
                                    JobDescriptionRepository jobDescriptionRepository) {
        this.companyRepository = companyRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
    }

    @Override
    public void run(String... args) {
        if (jobDescriptionRepository.count() > 0) {
            System.out.println("JobDescription data already exists. Skipping generation.");
            return;
        }

        List<String> jobTypes = List.of("Full-time", "Part-time", "Internship", "Contract");
        List<String> positions = List.of(
                "Software Engineer", "Cloud Engineer", "DevOps Engineer", "Infra Engineer", "Site Reliability Engineer",
                "Backend Developer", "Frontend Developer", "Android Developer", "IOS Developer",
                "Database Administrator", "System Engineer", "Solutions Architect", "Application Architect", "Customer Engineer"
        );
        List<String> experiences = List.of(
                "0-2 years", "3-5 years", "5-7 years", "7-10 years", "10-15 years", "15-20 years", "20+ years"
        );
        List<String> workingAreas = List.of(
                "Seoul, Korea", "Remote", "Seongnam, Korea", "Tokyo, Japan",
                "Seattle, USA", "San Francisco, USA", "Mountain View, USA", "San Jose, USA", "Palo Alto, USA"
        );
        List<String> closeTypeCodes = List.of("CLOSED_ON_EXP", "CLOSED_ON_HIRED", "NA");

        int targetCount = 1000;
        log.info("Generating " + targetCount + " dummy job descriptions...");

        for (int i = 0; i < targetCount; i++) {
            // --- Company 생성 또는 조회 ---
            String companyName = "Company-" + (random.nextInt(50) + 1);
            Company company = companyRepository.findCompanyByCompanyName(companyName)
                    .orElseGet(() -> companyRepository.save(
                            Company.builder().companyName(companyName).build()
                    ));

            // --- JobDescription 필드 랜덤 생성 ---
            String jobType = getRandom(jobTypes);
            String position = getRandom(positions);
            String experience = getRandom(experiences);
            String education = "Bachelor's Degree";
            String workingArea = getRandom(workingAreas);
            String link = "https://www." + companyName.toLowerCase() + ".com/careers/" + (10000 + i);
            String keyword = UUID.randomUUID().toString().substring(0, 8);
            String openingDate = LocalDate.now().minusDays(random.nextInt(30)).toString();
            String expirationDate = LocalDate.now().plusDays(random.nextInt(60) + 10).toString();
            String jobTitle = "[" + companyName + "] " + position + " (" + jobType + ")";
            String industry = "IT / Software";
            String closeTypeCode = getRandom(closeTypeCodes);

            // --- JobDescription 생성 ---
            JobDescription jd = JobDescription.builder()
                    .link(link)
                    .keyword(keyword)
                    .openingDate(openingDate)
                    .expirationDate(expirationDate)
                    .company(company)
                    .jobTitle(jobTitle)
                    .industry(industry)
                    .workingArea(workingArea)
                    .jobType(jobType)
                    .experience(experience)
                    .education(education)
                    .closeTypeCode(closeTypeCode)
                    .build();

            jobDescriptionRepository.save(jd);
        }

        log.info("✅ Successfully generated " + targetCount + " JobDescription records.");
    }

    private <T> T getRandom(List<T> list) {
        return list.get(random.nextInt(list.size()));
    }
}
