package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Dto.ProcessDto;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomRepositoryImpl implements CustomRepository {
    @Autowired
    private MongoTemplate mongoTemplate;


    /*
    * 서류 유형 추가
    * */
    @Override
    public void updateTemplate(Query q, Update u,Class c) {
        System.out.println("CUSTOM!");
        mongoTemplate.findAndModify(q,u,c);
//        return null;
    }

    @Override
    public void upsertProcess(Query q, Update u,Class c) {
        System.out.println("CUSTOM!");
        mongoTemplate.upsert(q,u,c);
//        return null;
    }


    @Override
    public void updateProcess(ProcessDto dto, Document doc){
       // BsonDocument bson = new BsonDocument();
        mongoTemplate.getConverter().write(dto,doc);

    }

}
