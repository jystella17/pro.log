package com.b112.prolog.common.advice;

import com.b112.prolog.user.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class UserControllerAdvice {

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<String> dataNotfoundException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionMessage.DATA_NOT_FOUND.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> userNotFoundException() { // 400 - User Not Found (UUID)
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionMessage.USER_NOT_FOUND.getMessage());
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<String> notAuthenticatedException() { // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ExceptionMessage.NOT_AUTHENTICATED.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> notAuthorizedException() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ExceptionMessage.ACCESS_DENIED.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> userAlreadyExistsException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionMessage.USER_ALREADY_EXISTS.getMessage());
    }

    @ExceptionHandler(LoginFailedException.class)
    public ResponseEntity<String> loginFailedException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionMessage.LOGIN_FAILED.getMessage());
    }
}
