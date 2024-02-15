package com.b112.prolog.process.repository;

import org.bson.Document;
import com.b112.prolog.process.dto.QnaDto;
import com.b112.prolog.process.dto.ProcessDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomRepositoryImpl implements CustomRepository {

    private final MongoTemplate mongoTemplate;

    /*
    * 서류 유형 추가
    * */
    @Override
    public void updateTemplate(Query q, Update u,Class c) {
        mongoTemplate.findAndModify(q,u,c);
    }

    @Override
    public void upsertProcess(Query q, Update u,String collection) {
        mongoTemplate.upsert(q,u,collection);
    }

    @Override
    public List<QnaDto> find(Query q, String collection) {
        return mongoTemplate.find(q, QnaDto.class, collection);
    }

    @Override
    public void updateProcess(ProcessDto dto, Document doc){
       // BsonDocument bson = new BsonDocument();
        mongoTemplate.getConverter().write(dto, doc);
    }
}
