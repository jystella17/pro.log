package com.b112.prolog.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum CareerType {

    GRADUATE("GRADUATE", "신입"),
    JUNIOR("JUNIOR", "1~5년차"),
    SENIOR("SENIOR", "5~10년차"),
    STAFF("STAFF", "10~15년차"),
    HEAD("HEAD", "직책자");

    private final String code;
    private final String displayName;

    public static CareerType of(String code) {
        return Arrays.stream(CareerType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElse(GRADUATE);
    }
}
