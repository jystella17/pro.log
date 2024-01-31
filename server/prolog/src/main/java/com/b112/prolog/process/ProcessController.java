package com.b112.prolog.process;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcessController {

    private final ProcessService processService;

    @GetMapping("process")
    public List<Process> findByAll(){
        System.out.println("HERE");
        return processService.getProcessList();
    }

}