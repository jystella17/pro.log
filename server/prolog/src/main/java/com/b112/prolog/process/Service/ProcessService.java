package com.b112.prolog.process.Service;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Dto.QnaDto;

import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
import com.b112.prolog.process.Entity.Qna;
import com.b112.prolog.process.Repository.ProcessRepository;

import com.b112.prolog.process.Repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class ProcessService {
    private final ProcessRepository processRepository;
    private final QnaRepository qnaRepository;


    public List<Process> getProcessList() {
        System.out.println("process t");
        List<Process> processList = processRepository.findAll();
        System.out.println(processList);
        return processList;
    }

    public Process getProcess(String oid) {
        Optional<Process> pc = processRepository.findById(oid);


        Process pcc = processRepository.findById(oid).orElseThrow();

        List<Template> essayList=pcc.getTest();
        QnaDto qnaDto = new QnaDto();
//        essayList =


        System.out.println("HERE   essay  "+pcc.getTest().get(0));
        for (Template t: essayList){
            /////////////////////이거 2 나중에 1로 바꿔@@@@@@

            if(t.getTemplate_type()==1){
                System.out.println("HERE     "+t.getContent());

                List<QnaDto> qnaList = t.getContent();
                if(t.getContent() != null){
                    int idx=0;
                    for(QnaDto qDto: qnaList){
                        Qna qna =  qnaRepository.findById(qDto.getId()).get();
                        qnaList.set(idx,qnaDto.toDto(qna));
                        idx++;
                    }

                    t.setContent(qnaList);
                }


            }
        }
        pcc.setTest(essayList);
        System.out.println(pcc);



        return pcc;

    }

    public void updateTemplate(String oid, String step, int templatetype ){

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        processRepository.updateTemplate(q,u,Process.class);


    }



    public Process insertProcess(ProcessDto dto){
        Process pcc = Process.builder().company(dto.getCompany()).end_status(dto.getEnd_status()).step(dto.getStep())
                .progress(dto.getProgress())
                .tag(dto.getTag())
                .start_date(dto.getStart_date())
                .end_date(dto.getEnd_date())
                .essay(dto.getEssay())
                .test(dto.getTest())
                .interview(dto.getInterview())
                .jd_id(dto.getJd_id()).build();
        System.out.println(pcc);
        Process pid = processRepository.save(pcc);
        return pid;
    }

    public int updateProcess(ProcessDto dto){
        //Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        Document bson = new Document();
//        System.out.println(bson+"==========================   "+dto.getId());
        processRepository.updateProcess(dto,bson);
        System.out.println(bson+"==========================");
        Query q = new Query(Criteria.where("_id").is(dto.getId()));
        Update u = Update.fromDocument(bson);


        processRepository.upsertProcess(q,u,"process");
        return 1;

    }

    public void updateKanban(List<ProcessDto> processDtos){
        for(ProcessDto pdto: processDtos){
            Query q = new Query(Criteria.where("_id").is(pdto.getId()));
            Update u = new Update();
            u.set("step",pdto.getStep());
            processRepository.upsertProcess(q,u,"process");
        }
    }

    //////////////////////////////////////////////////////////
    public void insertTemplate(String oid, String step, int templatetype ){
        String typename ="";   //이건 int Switch용
        switch(templatetype) {
            case 1:
                typename="QnA";
                break;
            case 2:
                typename="CodeTest";
                break;
            case 3:
                typename="Toggle";
                break;
            case 4:
                typename="Memo";
                break;
            default :System.out.println("Error");
        }

        Template essayTemplate = new Template(templatetype,typename,null);

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

//        u.set("company","LINE"); //이건 테스트용입니다.
//        u.set("essay",lt);
//        u.addToSet("essay",essayTemplate);

        //서류, 코테 , 면접 Arr (templatename) 중 template 추가
        u.push(step,essayTemplate);

        processRepository.updateTemplate(q,u,Process.class);


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

