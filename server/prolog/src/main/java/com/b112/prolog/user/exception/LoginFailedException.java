package com.b112.prolog.user.exception;

import javax.security.auth.login.LoginException;

public class LoginFailedException extends LoginException {

    public LoginFailedException() {
        super(ExceptionMessage.LOGIN_FAILED.getMessage());
    }
}
