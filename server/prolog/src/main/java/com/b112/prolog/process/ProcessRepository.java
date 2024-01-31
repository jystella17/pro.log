package com.b112.prolog.process;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProcessRepository extends MongoRepository<Process,String> {
    List<Process> findByAll();

}
