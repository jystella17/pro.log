package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Dto.ProcessDto;
import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
import org.bson.BsonDocument;
import org.bson.Document;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public interface CustomRepository {
    /**?
     * MongoTemlate사용할 함수들
     * @param q
     * @param u
     * @param c
     * @return
     */
    List<Template> updateTemplate(Query q, Update u,Class c);
    void updateProcess(ProcessDto dto, Document doc);
    List<Template> upsertProcess(Query q, Update u,Class c);
}
