package com.b112.prolog.jobdescription.controller;

<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
import com.b112.prolog.jobdescription.dto.JdAndProcessListDto;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.jobdescription.service.JdAndProcessService;
import com.b112.prolog.jobdescription.service.JobDescriptionService;
=======
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
import com.b112.prolog.process.dto.ProcessDto;
import com.b112.prolog.jobdescription.dto.JdAndProcessListDto;
import com.b112.prolog.process.entity.Process;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.process.service.ProcessService;
import com.b112.prolog.jobdescription.service.JobDescriptionService;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final JobDescriptionService jobDescriptionService;
    private final ProcessService processService;
    private final JdAndProcessService jdAndProcessService;

    /**
     * 캘린더 창 API
     * Jd entity list와 Process entity list를 JDAndProcessListDto에 모아서 전달합니다.
     * @param year String
     * @param month String
     * @return ResponseEntity
     */
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
    @GetMapping("/calendar/{year}/{month}")
    public ResponseEntity<?> calendarView(@PathVariable("year") String year, @PathVariable("month") String month) {

        String date = year + "-" + month;

        try {

            JdAndProcessListDto jdAndProcessListDto = jdAndProcessService.findAllJdAndProcess(date);

            if (jdAndProcessListDto.getJd() != null || jdAndProcessListDto.getProcess() != null) {
=======

    @GetMapping("/calendar/{year}/{month}")
    public ResponseEntity<?> calendarView(@PathVariable("year") String year, @PathVariable("month") String month) {
        String date = year+"-"+month;

        try {
            JdAndProcessListDto jdAndProcessListDto = new JdAndProcessListDto();
            jdAndProcessListDto.setJd(jobDescriptionService.findByPeriod(date));
            jdAndProcessListDto.setProcess(processService.getProcessList());

            if(jdAndProcessListDto.getJd()!= null) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
                return new ResponseEntity<>(jdAndProcessListDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
        } catch (Exception e) {
=======
        }
        catch (Exception e) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
            return exceptionHandling(e);
        }
    }

    /**
     * 검색어를 포함한 공고만 찾기
     * @param title String
     * @return ResponseEntity
     */
    @GetMapping("/calendar/{title}")
    public ResponseEntity<?> calendarView(@PathVariable("title") String title) {
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e

        try {

            List<JobDescription> jobDescriptionList = jobDescriptionService.findByJobTitleContaining(title);

            if (jobDescriptionList != null) {
                return new ResponseEntity<>(jobDescriptionList, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
=======
        try {
            JdAndProcessListDto jdAndProcessListDto = new JdAndProcessListDto();
            jdAndProcessListDto.setJd(jobDescriptionService.findByJobTitleContaining(title));

            if(jdAndProcessListDto.getJd()!= null) {
                return new ResponseEntity<>(jdAndProcessListDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception e) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
            return exceptionHandling(e);
        }
    }

    /**
     * 칸반 창 API
     * Process리스트 전체 받아옴
     */
    @GetMapping("/kanban")
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
    public ResponseEntity<?> kanbanView() {

        try {
            List<Process> pcList = processService.getProcessList();
            if (pcList != null) {
=======
    public ResponseEntity<?> kanbanView(){
        try {
            List<Process> pcList = processService.getProcessList();
            if(pcList != null) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
                return new ResponseEntity<>(pcList, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    /**
     * Kanban의 변동사항 업데이트
     * List <{processid , step ( essay, test, interview  . .)} > 로 요청
     */
    @PutMapping("/kanban")
    public ResponseEntity<?> updateKanban(@RequestBody List<ProcessDto> processDto) {
        try {
            processService.updateKanban(processDto);
        } catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/calendar/{jdid}")
    public ResponseEntity<?> viewJD(@PathVariable Long jdid) {
        try {
            Optional<JobDescription> jobDescription = jobDescriptionService.findOne(jdid);
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
            if (jobDescription.isPresent()) {
=======
            if(jobDescription.isPresent()) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
                return new ResponseEntity<>(jobDescription, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
        } catch (Exception e) {
=======
        }
        catch (Exception e) {
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
            return exceptionHandling(e);
        }
    }

    /**
     *
     * JD를 통해 받은 정보로 최초 Process 생성
     *
     * @param dto JD에 있는 정보들
     */
    @PostMapping("/process")
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
    public ResponseEntity<?> insertProcess(@RequestBody ProcessDto dto) {
=======
    public ResponseEntity<?> insertProcess(@RequestBody ProcessDto dto){
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
        try {
            Process pc = processService.insertProcess(dto);
            if (pc != null) {
                return new ResponseEntity<>(pc.getId(), HttpStatus.OK);
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
=======
            } else{
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e){
            return exceptionHandling(e);
        }
    }

//    @PostMapping("/calendar/{year}/{month}")
//    public ResponseEntity<?> createProcess(UserPrincipal user, JobDescriptionDto jdDto){
//        return null;
//    }
//
//    @PostMapping("/calender/{year}/{month}/custom")
//    public ResponseEntity<?> createCustumProcess(UserPrincipal user ){
//        return null;
//    }

>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
<<<<<<< 17dc5393adeaff4ae16da2bc0f9fbbcdd297f06e

}
=======
}
>>>>>>> 942b6a8a01f84fd80ad933eee3df17fe48ca6f47