package com.b112.prolog.process;

import com.b112.prolog.process.Entity.Process;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcessRepository extends MongoRepository<Process,ObjectId> ,CustomRepository{

}
