package com.b112.prolog.user.repository;

import com.b112.prolog.process.entity.Qna;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MasterQnaRepository extends MongoRepository<Qna, String> {

}
