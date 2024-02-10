package com.b112.prolog.user.repository;

import com.b112.prolog.user.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
