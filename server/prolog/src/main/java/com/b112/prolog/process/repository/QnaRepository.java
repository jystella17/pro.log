package com.b112.prolog.process.repository;

import com.b112.prolog.process.entity.Qna;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QnaRepository extends MongoRepository<Qna, String>, CustomRepository {

}
