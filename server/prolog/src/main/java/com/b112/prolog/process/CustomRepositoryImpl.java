package com.b112.prolog.process;

import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.UpdateDefinition;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomRepositoryImpl implements CustomRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Template> CustomTemplate(Query q, Update u,Class c) {
        System.out.println("CUSTOM!");
        mongoTemplate.findAndModify(q,u,c);
        System.out.println(mongoTemplate.findAndModify(q,u,c));

        return null;
    }
}
