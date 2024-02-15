package com.b112.prolog.user.info;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuth2Provider {
    DEFAULT("default"),
    KAKAO("kakao"),
    NAVER("naver");

    private final String registrationId;
}
