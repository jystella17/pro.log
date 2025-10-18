package com.b112.prolog.user.exception;

import jakarta.persistence.EntityExistsException;

public class UserAlreadyExistException extends EntityExistsException {
    public UserAlreadyExistException() {
        super(ExceptionMessage.USER_ALREADY_EXISTS.getMessage());
    }
}
