package com.b112.prolog.process.service;

import com.b112.prolog.process.dto.CodingTestDto;
import com.b112.prolog.process.dto.QnaDto;
import com.b112.prolog.process.dto.ProcessDto;
import com.b112.prolog.process.dto.Template;
import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.process.entity.Process;
import com.b112.prolog.process.entity.TemplateType;
import com.b112.prolog.process.repository.QnaRepository;
import com.b112.prolog.process.repository.ProcessRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.assertions.Assertions;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessService {

    private final ProcessRepository processRepository;
    private final QnaRepository qnaRepository;

    public List<Process> getProcessList() {
        return processRepository.findAll();
    }

    @Transactional
    public Process getProcess(String oid) {
        Process process = processRepository.findById(oid).orElseThrow();

        List<Template> essayList = getQnaContents(process.getEssay());
        List<Template> testList = getQnaContents(process.getTest());
        List<Template> interviewList = getQnaContents(process.getInterview());

        process.updateTemplates(essayList, testList, interviewList);
        return process;
    }

    public void updateTemplate(String oid, String step, int templateType) {
        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        processRepository.updateTemplate(q, u, Process.class);
    }

    public Process insertProcess(ProcessDto dto){
        Process pcc = Process.builder().company(dto.getCompany()).end_status(dto.getEnd_status()).step(dto.getStep())
                .progress(dto.getProgress()).tag(dto.getTag()).start_date(dto.getStart_date())
                .end_date(dto.getEnd_date()).essay(dto.getEssay()).test(dto.getTest())
                .interview(dto.getInterview()).jd_id(dto.getJd_id()).build();

        return processRepository.save(pcc);
    }

    @Transactional
    public void updateProcess(ProcessDto dto) {
        Document bson = new Document();
        processRepository.updateProcess(dto, bson);
        log.info("Process Updated: " + bson.toString());

        Query q = new Query(Criteria.where("_id").is(dto.getId()));
        Update u = Update.fromDocument(bson);

        processRepository.upsertProcess(q, u,"process");
    }

    @Transactional
    public void updateKanban(List<ProcessDto> processDtos) {
        for(ProcessDto pdto: processDtos){
            Query q = new Query(Criteria.where("_id").is(pdto.getId()));
            Update u = new Update();
            u.set("step", pdto.getStep());

            processRepository.upsertProcess(q, u,"process");
        }
    }

    @Transactional
    public void insertTemplate(String oid, String step, int templateType){
        Template essayTemplate = new Template(templateType, TemplateType.of(templateType).toString(),
                            null, null, null, null);

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        //서류, 코테 , 면접 Arr (templatename) 중 template 추가
        u.push(step, essayTemplate);
        processRepository.updateTemplate(q, u, Process.class);
    }

    @Transactional
    public List<Template> getQnaContents(List<Template> templates) {
        if(templates.isEmpty()) {
            return new ArrayList<>();
        }

        for(Template t: templates) {
            if(t.getTemplateType() == TemplateType.QNA.getCode()) {
                List<QnaDto> qnaList = t.getQnaList();

                if(t.getQnaList() != null) {
                    int idx=0;
                    for(QnaDto qDto: qnaList){
                        Qna qna =  qnaRepository.findById(qDto.getId()).get();
                        qnaList.set(idx, qDto.toDto(qna));
                        idx++;
                    }
                    t.setQnaList(qnaList);
                }
            }
        }
        return templates;
    }

    //    public void updateEssay(String oid, int templatetype){
//        System.out.println(oid+"oid"+templatetype);
//        Template essayTemplate = new Template(templatetype,"전형추가",null);
//        List<Template> lt = new ArrayList<>();
//        lt.add(essayTemplate);
//        Optional<Process> asis = processRepository.findById(oid);
//
//        Process updateEssay = Process.builder().company("SK").essay(lt).build();
//        updateEssay.setId(oid);
//        processRepository.save(updateEssay);
//    }
}
