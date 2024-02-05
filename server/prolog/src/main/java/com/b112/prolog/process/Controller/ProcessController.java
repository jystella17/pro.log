package com.b112.prolog.process.Controller;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Service.ProcessService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcessController {

    private final ProcessService processService;

    @GetMapping("/process")
    public List<Process> findByAll(){
        System.out.println("HERE");

//        return null;
        return processService.getProcessList();
    }

    /**?
     *  해당 Process 조회
     * @param processid 프로세스 ID
     */
    @GetMapping("/{processid}")
    public Optional<Process> findProcess(@PathVariable ObjectId processid){
        System.out.println(processid+"oid cont");


        return processService.getProcess(processid);
    }

    /**?
     *  JD를 통해 받은 정보로 최초 Process 생성
     * @param dto JD에 있는 정보들
     */
    @PostMapping("/process")
    public int insertProcess(@RequestBody ProcessDto dto){
        //ProcessDto pc = processService.insertProcess(dto);
        processService.insertProcess(dto);
        return 1;
    }




    /**?
     *  template추가 시 호출
     * @param step 어떤 유형 essay , test, interview 에 추가할건지
     * @param templatetype 어떤 타입의 템플릿 열었는지 ?  1: QnA템플릿 2:코테템플릿 3:토글 4:메모
     */
    @PutMapping("/{processid}/{step}/{templatetype}")
    public int updateTemplate(@PathVariable ObjectId processid,@PathVariable String step ,@PathVariable int templatetype){

        processService.insertTemplate(processid,step,templatetype);
        return 1;
    }

    @PutMapping("/process")
    public int updateProcess (@RequestBody ProcessDto dto){
        processService.updateProcess(dto);
        return 1;
    }

//    @PutMapping("/process")
//    public int updateProcess(@RequestBody ProcessDto dto){
//
//        return 1;
//    }



}