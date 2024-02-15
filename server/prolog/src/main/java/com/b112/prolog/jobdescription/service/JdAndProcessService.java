package com.b112.prolog.jobdescription.service;

import com.b112.prolog.jobdescription.cache.CacheJd;
import com.b112.prolog.jobdescription.dto.JdAndProcessListDto;
import com.b112.prolog.jobdescription.entity.JobDescription;
import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.service.ProcessService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JdAndProcessService {

    private final ProcessService processService;
    private final JobDescriptionService jobDescriptionService;

    public JdAndProcessListDto findAllJdAndProcess(String date, String year, String month){
        List<JobDescription> jobDescriptionList = jobDescriptionService.findByPeriod(date, year, month);
        List<Process> processList = processService.getProcessList();

        JdAndProcessListDto build = JdAndProcessListDto.builder().jd(jobDescriptionList).process(processList).build();
        return build;
    }
}
