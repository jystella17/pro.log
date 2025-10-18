package com.b112.prolog.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {

    USER_NOT_FOUND("No Such User"),
    NOT_AUTHENTICATED("Not Authenticated"),
    ACCESS_TOKEN_EXPIRED("Access Token Expired"),
    REFRESH_TOKEN_EXPIRED("Refresh Token Expired"),
    ACCESS_DENIED("Access Not Allowed"),
    DATA_NOT_FOUND("Data Not Found"),
    USER_ALREADY_EXISTS("Already Registered User"),
    LOGIN_FAILED("Wrong email or password");

    private final String message;
}
