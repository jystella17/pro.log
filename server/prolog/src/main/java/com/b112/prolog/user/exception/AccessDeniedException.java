package com.b112.prolog.user.exception;

import org.springframework.dao.DataAccessException;

public class AccessDeniedException extends DataAccessException {

    public AccessDeniedException(){
        super(ExceptionMessage.ACCESS_DENIED.getMessage());
    }

    public AccessDeniedException(String msg) {
        super(msg);
    }

    public AccessDeniedException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
