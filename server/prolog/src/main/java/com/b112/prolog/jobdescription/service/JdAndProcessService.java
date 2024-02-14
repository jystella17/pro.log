package com.b112.prolog.jobdescription.service;

import com.b112.prolog.jobdescription.dto.JdAndProcessListDto;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.service.ProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JdAndProcessService {

    private final JobDescriptionService jobDescriptionService;
    private final ProcessService processService;

    public JdAndProcessListDto findAllJdAndProcess(String date){
        List<JobDescription> jobDescriptionList = jobDescriptionService.findByPeriod(date);
        List<Process> processList = processService.getProcessList();

        JdAndProcessListDto build = JdAndProcessListDto.builder().jd(jobDescriptionList).process(processList).build();
        return build;
    }
}
