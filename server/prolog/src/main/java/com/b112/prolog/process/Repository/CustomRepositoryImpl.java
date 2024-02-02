package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Dto.Template;
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
    public List<Template> CustomTemplate(Query q, Update u,Class c) {
        System.out.println("CUSTOM!");
        mongoTemplate.findAndModify(q,u,c);

        return null;
    }
}
