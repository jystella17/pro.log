package com.b112.prolog.user.repository;

import com.b112.prolog.user.entity.RefreshTokenInfo;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<RefreshTokenInfo, String> {

}
