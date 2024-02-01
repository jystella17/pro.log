package com.b112.prolog.jobDescription.Service;

import com.b112.prolog.jobDescription.Entity.Company;
import com.b112.prolog.jobDescription.Entity.JobDescription;
import com.b112.prolog.jobDescription.Repository.CompanyRepository;
import com.b112.prolog.jobDescription.Repository.JobDescriptionRepository;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobDescriptionService {

    private final JobDescriptionRepository jdRepository;
    private final CompanyRepository companyRepository;




    /**
     * 전체 JD 조회
     * 캘린더뷰 실행했을 때 받아와야하는 부분
     * @return 리스트 <JD>
     */
    public List<JobDescription> getAllJDs() {
        return jdRepository.findAll();
    }

    /**
     * ID로 JD 찾기
     *
     * @param jdId
     * @return Optional<JobDescription>
     */
    public Optional<JobDescription> findOne(Long jdId) {
        return jdRepository.findById(jdId);
    }

    /**
     * 공고명으로 jd 찾기
     *
     * @param title
     * @return
     */
    public List<JobDescription> findByTitle(String title) {
        return jdRepository.findByJobTitle(title);
    }

    /**
     * 검색어를 포함한 공고만 찾기
     * @param title
     * @return
     */
    public List<JobDescription> findByJobTitleContaining (String title){
        return jdRepository.findByJobTitleContaining(title);
    }



    /**
     * 검색어를 갖는 기업 검색 ( 관심 기업 찾을 때 사용 )
     * @param companyName
     * @return
     */
    public List<Company> findByCompanyName (String companyName){
        return companyRepository.findByCompanyNameContaining(companyName);
    }

    /**
     * 전체 기업 받기
     * @return
     */
    public List<Company> findAllCompany(){
        return companyRepository.findAll();
    }




}
