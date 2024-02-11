package com.b112.prolog.chat.exception;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PubNotFoundException extends RuntimeException {

    public void pubNotFoundLog(String errMsg) {
        log.error("Published Message not found : " + errMsg);
    }

    public PubNotFoundException(String errMsg) {
        pubNotFoundLog(errMsg);
    }
}
