package com.b112.prolog.user.exception;


import org.springframework.security.core.AuthenticationException;

public class NotAuthenticatedException extends AuthenticationException {
    public NotAuthenticatedException(String msg) {
        super(msg);
    }

    public NotAuthenticatedException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
