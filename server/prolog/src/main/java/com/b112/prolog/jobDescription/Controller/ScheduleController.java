package com.b112.prolog.jobDescription.Controller;

import com.b112.prolog.jobDescription.Dto.JdAndProcessListDto;
import com.b112.prolog.jobDescription.Dto.JobDescriptionDto;
import com.b112.prolog.jobDescription.Entity.JobDescription;
import com.b112.prolog.jobDescription.Service.JobDescriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
@Slf4j
public class ScheduleController {


    private final JobDescriptionService jobDescriptionService;


    /**
     * 캘린더 창 API
     * Jd entity list와 Process entity list를 JDAndProcessListDto에 모아서 전달합니다.
     * Process 추가 요망
     * @param year
     * @param month
     * @param userPrincipal
     * @return
     */
    @GetMapping("/calender/{year}/{month}")
    public ResponseEntity<?> calenderView(@PathVariable("year") String year, @PathVariable("month") String month, @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String date = year+"-"+month;

        try {

            JdAndProcessListDto jdAndProcessListDto = new JdAndProcessListDto();

            jdAndProcessListDto.setJd(jobDescriptionService.findByPeriod(date));



            if(jdAndProcessListDto.getJd().isPresent()){
                return new ResponseEntity<JdAndProcessListDto>(jdAndProcessListDto, HttpStatus.OK);
            } else{
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception e){
            return exceptionHandling(e);
        }

    }

    /**
     * 칸반 창 API
     * Process 추가 요망
     * @param year
     * @param month
     * @param userPrincipal
     * @return 프로세스Dto list
     */
    @GetMapping("/kanban/{year}/{month}")
    public ResponseEntity<?> kanbanView(@PathVariable("year")String year, @PathVariable("month")String month, @AuthenticationPrincipal UserPrincipal userPrincipal){

        return null;
    }

    @PostMapping("/calendar/{year}/{month}")
    public ResponseEntity<?> createProcess(UserPrincipal user, JobDescriptionDto jdDto){
        return null;
    }

    @PostMapping("/calender/{year}/{month}/custom")
    public ResponseEntity<?> createCustumProcess(UserPrincipal user ){
        return null;
    }


    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
