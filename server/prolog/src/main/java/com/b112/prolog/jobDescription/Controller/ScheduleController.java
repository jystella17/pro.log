package com.b112.prolog.jobDescription.Controller;

import com.b112.prolog.jobDescription.Dto.JdAndProcessListDto;
import com.b112.prolog.jobDescription.Dto.JobDescriptionDto;
import com.b112.prolog.jobDescription.Entity.JobDescription;
import com.b112.prolog.jobDescription.Service.JobDescriptionService;
import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Service.ProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
@Slf4j
public class ScheduleController {


    private final JobDescriptionService jobDescriptionService;
    private final ProcessService processService;


    /**
     * 캘린더 창 API
     * Jd entity list와 Process entity list를 JDAndProcessListDto에 모아서 전달합니다.
     * Process 추가 요망
     * @param year
     * @param month
//     * @param userPrincipal
     * @return
     */

//    , @AuthenticationPrincipal UserPrincipal userPrincipal
    @GetMapping("/calendar/{year}/{month}")
    public ResponseEntity<?> calenderView(@PathVariable("year") String year, @PathVariable("month") String month) {

        String date = year+"-"+month;

        try {
//            List<Process> pcList = processService.getProcessList();

            JdAndProcessListDto jdAndProcessListDto = new JdAndProcessListDto();
            jdAndProcessListDto.setJd(jobDescriptionService.findByPeriod(date));
            jdAndProcessListDto.setProcess(processService.getProcessList());



            if(jdAndProcessListDto.getJd()!= null){
                System.out.println("dd");
                return new ResponseEntity<>(jdAndProcessListDto, HttpStatus.OK);
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
//     * @param userPrincipal
     * @return 프로세스Dto list
     */
//    @AuthenticationPrincipal UserPrincipal userPrincipal
//    @GetMapping("/kanban/{year}/{month}")
//    public ResponseEntity<?> kanbanView(@PathVariable("year")String year, @PathVariable("month")String month ){
//
//        return null;
//    }

    /**
     * 칸반 창 API
     * Process리스트 전체 받아옴
    * */
    @GetMapping("/kanban")
    public ResponseEntity<?> kanbanView(){

        try {
            List<Process> pcList = processService.getProcessList();
            if(pcList != null){
                return new ResponseEntity<>(pcList, HttpStatus.OK);
            }else{
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return exceptionHandling(e);
        }

    }

    @GetMapping("/calendar/{jdid}")
    public ResponseEntity<?> viewJD(@PathVariable Long jdid){
        try {
            Optional<JobDescription> jobDescription = jobDescriptionService.findOne(jdid);
            if(jobDescription.isPresent()){
                return new ResponseEntity<>(jobDescription, HttpStatus.OK);
            } else{
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }
        catch (Exception e){
            return exceptionHandling(e);
        }
    }

    /**?
     *  JD를 통해 받은 정보로 최초 Process 생성
     * @param dto JD에 있는 정보들
     */
    @PostMapping("/process")
    public ResponseEntity<?> insertProcess(@RequestBody ProcessDto dto){
        //ProcessDto pc = processService.insertProcess(dto);
        try {
            Process pc = processService.insertProcess(dto);
            if(pc != null){
                return new ResponseEntity<>(pc.getId().toString(), HttpStatus.OK);
            }else{
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return exceptionHandling(e);
        }
//        Process pc = processService.insertProcess(dto);
        //return pc.getId().toString();
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


    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
