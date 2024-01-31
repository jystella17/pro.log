package com.b112.prolog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProcessController {
    private final ProcessService processService;

    @GetMapping("api/process/{title}")
    public String findById(@PathVariable String title){
        System.out.println("test");
        return null;
        // return (ShelterNameSearchResponsseDto) shelterService.getShelterList(title);
    }
}