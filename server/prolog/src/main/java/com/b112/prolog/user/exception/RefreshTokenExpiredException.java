package com.b112.prolog.user.exception;

import org.springframework.security.core.AuthenticationException;

public class RefreshTokenExpiredException extends AuthenticationException {
    public RefreshTokenExpiredException() {
        super(ExceptionMessage.REFRESH_TOKEN_EXPIRED.getMessage());
    }

    public RefreshTokenExpiredException(String msg) {
        super(msg);
    }

    public RefreshTokenExpiredException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
