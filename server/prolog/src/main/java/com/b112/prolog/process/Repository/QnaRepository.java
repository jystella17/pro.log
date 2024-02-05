package com.b112.prolog.process.Repository;

import com.b112.prolog.process.Entity.Qna;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QnaRepository extends MongoRepository<Qna, ObjectId>, CustomRepository {

}