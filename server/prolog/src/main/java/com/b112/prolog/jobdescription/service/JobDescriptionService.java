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

    @Value("${SARMAIN_URL}")
    private String saraminUrl;

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

    /**
     * 매일 오전 5시에 JD를 업데이트 하는 함수
     * @throws ParseException 파싱 실패 시
     */
    @Transactional
    @Scheduled(cron = "0 0 5 * * ?")
    public void saveJD() throws ParseException {
        //사람인 API response data 받아오기
        String startPage = "0";
        String apiURL = saraminUrl+startPage;
        RestTemplate rest = new RestTemplate();
        ResponseEntity<String> res = rest.getForEntity(apiURL, String.class);

        //JSON 데이터 String Parsing
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject1 = (JSONObject) jsonParser.parse(res.getBody());
        JSONObject jsonObject2 = (JSONObject) jsonObject1.get("jobs");
        JSONArray jsonArray = (JSONArray) jsonObject2.get("job");

        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject job = (JSONObject) jsonArray.get(i);

            String link = (String) job.get("url");
            String keyword = (String) job.get("keyword");
            String openingTimestamp = (String) job.get("opening-timestamp");
            String expirationTimestamp = (String) job.get("expiration-timestamp");

            //Unixtime을 DateFormat으로 변경
            long timestamp = Long.parseLong(openingTimestamp);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
            Date date = new Date();
            date.setTime(timestamp * 1000L);
            String openingDatetime = simpleDateFormat.format(date);

            timestamp = Long.parseLong(expirationTimestamp);
            date.setTime(timestamp * 1000L);
            String expirationDatetime = simpleDateFormat.format(date);

            JSONObject closeType = (JSONObject) job.get("close-type");
            String closeTypeCode = (String) closeType.get("code");

            JSONObject company = (JSONObject) job.get("company");
            JSONObject detail = (JSONObject) company.get("detail");
            String companyName = (String) detail.get("name");

            JSONObject position = (JSONObject) job.get("position");

            //공고명은 중복을 최대한 방지하기 위해 회사명 + api공고명 으로 설정
            String title = (String) companyName + " " + position.get("title");

            JSONObject industry = (JSONObject) position.get("industry");
            String industryName = (String) industry.get("name");
            JSONObject location = (JSONObject) position.get("location");
            String locationName = (String) location.get("name");
            JSONObject jobType = (JSONObject) position.get("job-type");
            String jobTypeName = (String) jobType.get("name");
            JSONObject jobMidCode = (JSONObject) position.get("job-mid-code");
            String jobMidCodeName = (String) jobMidCode.get("name");
            JSONObject experienceLevel = (JSONObject) position.get("experience-level");
            String experienceLevelName = (String) experienceLevel.get("name");
            JSONObject eduLevel = (JSONObject) position.get("required-education-level");
            String eduLevelName = (String) eduLevel.get("name");

            //회사명 중복 검사
            //true: company entity 새로 생성 후 save
            //false: 기존에 존재하는 entity 반환

            Company comp = null;

            if(validateDuplicateCompany(companyName)){
                comp = Company.builder().companyName(companyName).build();
                companyRepository.save(comp);
                System.out.println("회사저장완료!!" + i);
            } else {
                comp = companyRepository.findByCompanyName(companyName).get(0);
            }

            JobDescription jd = JobDescription.builder().link(link).keyword(keyword).openingDate(openingDatetime).
                    expirationDate(expirationDatetime).company(comp).jobTitle(title).industry(industryName).workingArea(locationName).
                    jobType(jobTypeName).jobMidCode(jobMidCodeName).experience(experienceLevelName).education(eduLevelName).closeTypeCode(closeTypeCode).build();

            //DB에 INSERT, 회사명+공고제목이 이미 존재하면 deny
            if (validateDuplicateJDtitle(jd)) {
                jdRepository.save(jd);
            };
        }
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
