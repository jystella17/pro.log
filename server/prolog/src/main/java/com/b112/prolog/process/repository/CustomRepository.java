package com.b112.prolog.process.repository;

import com.b112.prolog.process.dto.ProcessDto;
import com.b112.prolog.process.dto.QnaDto;

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
    void updateTemplate(Query q, Update u,Class c);
    void updateProcess(ProcessDto dto, Document doc);
    void upsertProcess(Query q, Update u,String collection);
    List<QnaDto> find(Query q, String collection);

}
