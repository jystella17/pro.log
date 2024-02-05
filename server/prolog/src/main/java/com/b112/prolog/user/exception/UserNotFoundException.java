package com.b112.prolog.user.exception;

import org.springframework.dao.DataAccessException;

public class UserNotFoundException extends DataAccessException {

    public UserNotFoundException(String msg) {
        super(msg);
    }

    public UserNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
