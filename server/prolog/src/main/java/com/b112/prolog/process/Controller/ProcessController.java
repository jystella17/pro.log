package com.b112.prolog.process.Controller;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.ProcessService;
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

    @GetMapping("/{processid}")
    public Optional<Process> findProcess(@PathVariable ObjectId processid){
        System.out.println(processid+"oid cont");
        return processService.getProcess(processid);
    }

    /*
    * JD에서 받은 정보들을 통해 Process 최초 생성
    * */
    @PostMapping("/process")
    public int insertProcess(@RequestBody ProcessDto dto){
        //ProcessDto pc = processService.insertProcess(dto);
        processService.insertProcess(dto);
        return 1;
    }


    /*
    * ?
    * Step (essay, test, interview [] ) 에 templatetype값 갖는 template 추가
    * */
    @PutMapping("/{processid}/{step}/{templatetype}")
    public int updateTemplate(@PathVariable ObjectId processid,@PathVariable String step ,@PathVariable int templatetype){
        System.out.println("ess"+processid);
        processService.updateTemplate(processid,step,templatetype);

        return 1;
    }

    @PostMapping("/test")
    public int updateProcess (@RequestBody ProcessDto dto){
        processService.updateProcess(dto);
        return 1;
    }




}