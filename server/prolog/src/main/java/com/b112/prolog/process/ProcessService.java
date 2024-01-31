package com.b112.prolog.process;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class ProcessService {
    private final ProcessRepository processRepository;
    public List<Process> getProcessList() {
        System.out.println("test");
        List<Process> processList = processRepository.findByAll();
        //return new ProcessDto(processList);
        return processList;

        //return null;
    }
}

