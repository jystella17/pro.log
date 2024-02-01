package com.b112.prolog.process;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Entity.Process;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class ProcessService {
    private final ProcessRepository processRepository;
    public List<Process> getProcessList() {
        System.out.println("process t");
        List<Process> processList = processRepository.findAll();
        System.out.println(processList);
        //return new ProcessDto(processList);
//        System.out.println(processList.get(0).getId());
        return processList;
//        return null;

    }

    public Optional<Process> getProcess(ObjectId oid) {

        Optional<Process> pc = processRepository.findById(oid);
        System.out.println(pc);

//        System.out.println(processList.get(0).getId());
        return pc;


    }

    public void insertProcess(ProcessDto dto){

        Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        System.out.println(pcc);
        processRepository.save(pcc);

    }

}

