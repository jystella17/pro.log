package com.b112.prolog.common.advice;

import com.b112.prolog.jobdescription.exception.JdAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class ScheduleControllerAdvice {

    @ExceptionHandler(JdAlreadyExistsException.class)
    public ResponseEntity<String> jdAlreadyExistsException() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JD Already Exists.");
    }
}
