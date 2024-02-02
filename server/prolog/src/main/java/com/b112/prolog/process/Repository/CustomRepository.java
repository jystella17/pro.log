package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Dto.Template;
import com.b112.prolog.process.Entity.Process;
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
    List<Template> CustomTemplate(Query q, Update u,Class c);
}
