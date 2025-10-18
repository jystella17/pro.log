package com.b112.prolog.process.controller;

import com.b112.prolog.process.dto.ProcessDto;
import com.b112.prolog.process.service.ProcessService;

import com.b112.prolog.user.entity.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcessController {

    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @GetMapping("/process")
    public ResponseEntity<?> findByAll(@AuthenticationPrincipal UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(processService.getProcessList(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    /**?
     *  해당 Process 조회
     * @param processId 프로세스 ID
     */
    @GetMapping("/{processid}")
    public ResponseEntity<?> findProcess(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                         @PathVariable String processId){
        try{
            return ResponseEntity.ok(processService.getProcess(processId));
        } catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    /**?
     *  JD를 통해 받은 정보로 최초 Process 생성
     * @param dto JD에 있는 정보들
     */
//    @PostMapping("/process")
//    public String insertProcess(@RequestBody ProcessDto dto){
//        //ProcessDto pc = processService.insertProcess(dto);
//        Process pc = processService.insertProcess(dto);
//        return pc.getId();
//    }

    /**?
     *  template추가 시 호출
     * @param step 어떤 유형 essay , test, interview 에 추가할건지
     * @param templatetype 어떤 타입의 템플릿 열었는지 ?  1: QnA템플릿 2:코테템플릿 3:토글 4:메모
     */
    @PutMapping("/{processid}/{step}/{templatetype}")
    public ResponseEntity<?> updateTemplate(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            @PathVariable String processid, @PathVariable String step,
                                            @PathVariable int templatetype){

        try{
            processService.insertTemplate(processid,step,templatetype);
        } catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/process")
    public ResponseEntity<?> updateProcess (@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            @RequestBody ProcessDto dto){
        try{
            processService.updateProcess(dto);
        } catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
