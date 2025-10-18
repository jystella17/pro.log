package com.b112.prolog.jobdescription.service;

import com.b112.prolog.jobdescription.cache.CacheJd;
import com.b112.prolog.jobdescription.entity.Company;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.jobdescription.repository.CompanyRepository;
import com.b112.prolog.jobdescription.repository.JobDescriptionRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobDescriptionService {

    private static final CacheJd CACHE_JD = new CacheJd();

    private final JobDescriptionRepository jdRepository;
    private final CompanyRepository companyRepository;

    /**
     * 전체 JD 조회
     * 캘린더뷰 실행했을 때 받아와야하는 부분
     * @return 리스트 <JD>
     */
    @Cacheable(cacheNames = "job-description")
    public List<JobDescription> findAllJDs() {
        log.info("JD fetching from DB");
        return jdRepository.findAll();
    }

    /**
     * 기간으로 JD 조회
     *
     * @param date : 사용자가 보고 있는 년도-월
     * @return 월 안에 존재하는 JD 리스트
     */
    @Cacheable(cacheNames = "job-description", key = "#year + '_' + #month")
    public List<JobDescription> findByPeriod(String date, String year, String month){
        log.info("JD fetching from DB :" + date);

        return jdRepository.findAllByOpeningDateStartingWithOrExpirationDateStartingWith(date, date);
    }

    /**
     * ID로 JD 찾기
     *
     * @param jdId Long
     * @return Optional<JobDescription>
     */
    public Optional<JobDescription> findOne(Long jdId) {
        return jdRepository.findById(jdId);
    }

    /**
     * 공고명으로 jd 찾기
     *
     * @param title String
     * @return List
     */
    public List<JobDescription> findByTitle(String title) {
        return jdRepository.findByJobTitle(title);
    }

    /**
     * 검색어를 포함한 공고만 찾기
     * @param title String
     * @return 검색어를 포함한 공고
     */
    public List<JobDescription> findByJobTitleContaining (String title){
        return jdRepository.findByJobTitleContaining(title);
    }

    /**
     * 검색어를 갖는 기업 검색 ( 관심 기업 찾을 때 사용 )
     * @param companyName String
     * @return 검색어와 일치하는 회사
     */
    public List<Company> findByCompanyName (String companyName){
        return companyRepository.findByCompanyNameContaining(companyName);
    }

    /**
     * 전체 기업 받기
     * @return 모든 회사 명
     */
    public List<Company> findAllCompany(){
        return companyRepository.findAll();
    }

    private boolean validateDuplicateCompany(String name) {
        List<Company> findCompany = companyRepository.findByCompanyName(name);
        if (!findCompany.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    private boolean validateDuplicateJDtitle(JobDescription jd) {
        List<JobDescription> findTitles = jdRepository.findByJobTitle(jd.getJobTitle());
        if (!findTitles.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }
}
