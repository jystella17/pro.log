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

    public Process getProcess(ObjectId oid) {
        Optional<Process> pc = processRepository.findById(oid);

        System.out.println(pc+ "    5555 ");
        Process pcc = processRepository.findById(oid).orElseThrow();
        System.out.println(pcc+ "    5555 ");
        List<Template> essayList=pcc.getTest();
        QnaDto qnaDto = new QnaDto();
//        essayList =


        System.out.println("HERE   essay  "+pcc.getTest().get(0));
        for (Template t: essayList){
            /////////////////////이거 2 나중에 1로 바꿔@@@@@@
            System.out.println("HERE  TTTT   "+t.getTemplate_type());
            System.out.println("HERE  T@@#@#@#@#T   "+t.getContent());

            if(t.getTemplate_type()==1){
                System.out.println("HERE     "+t.getContent());

                List<QnaDto> qnaList = t.getContent();
                if(t.getContent() != null){
                    int idx=0;
                    for(QnaDto qDto: qnaList){
                        System.out.println("QQQNAA  "+ qDto + "    "+qnaList.size() );
                        Qna qna =  qnaRepository.findById(qDto.getId()).get();
                        System.out.println("WHAT? "+ qna + " id "+qna.getQuestion());
                        qnaList.set(idx,qnaDto.toDto(qna));
                        idx++;
//                        qnaList.add(qnaDto.toDto(qna));
                    }
                    System.out.println(t+"   = = = = =  " + qnaList.get(0));
                    t.setContent(qnaList);
                }


            }
        }
        pcc.setTest(essayList);
        System.out.println(pcc);



        return pcc;

    }

    public void updateTemplate(ObjectId oid, String step, int templatetype ){

        Query q = new Query(Criteria.where("_id").is(oid));
        Update u = new Update();

        processRepository.updateTemplate(q,u,Process.class);


    }



    public Process insertProcess(ProcessDto dto){
        Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        System.out.println(pcc);
        Process pid = processRepository.save(pcc);
        return pid;
    }

    public void updateProcess(ProcessDto dto){
        //Process pcc = Process.builder().company(dto.getCompany()).jd_id(dto.getJd_id()).build();
        Document bson = new Document();
        System.out.println(bson+"==========================   "+dto.getId());
        processRepository.updateProcess(dto,bson);
        System.out.println(bson+"==========================");



        Query q = new Query(Criteria.where("_id").is(dto.getId()));
        Update u = Update.fromDocument(bson);
//        Update u =new Update().addToSet("company",dto.getCompany());

        processRepository.upsertProcess(q,u,"process");

    }

    //////////////////////////////////////////////////////////
    public void insertTemplate(ObjectId oid, String step, int templatetype ){
        String typename ="";   //이건 int Switch용
        switch(step) {
            case "essay":
                typename="서류전형";
                break;
            case "test":
                typename="테스트전형";
                break;
            case "interview":
                typename="면접전형";
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


    //    public void updateEssay(ObjectId oid, int templatetype){
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

