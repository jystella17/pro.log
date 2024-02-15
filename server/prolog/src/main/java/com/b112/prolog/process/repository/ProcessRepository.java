package com.b112.prolog.process.repository;

import com.b112.prolog.process.entity.Process;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcessRepository extends MongoRepository<Process,String>, CustomRepository{

}

