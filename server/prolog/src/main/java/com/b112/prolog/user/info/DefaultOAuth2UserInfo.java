package com.b112.prolog.user.info;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Map;


@RequiredArgsConstructor
@Getter
public class DefaultOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider provider = OAuth2Provider.DEFAULT;
    private final Map<String, Object> attributes;
    private final String accessToken;

    @NonNull
    private final String id;

    private final String email;
    private final String name;
    private final String nickName;
    private final String profileImageUrl;

    public DefaultOAuth2UserInfo(@NonNull String id) {
        this.id = id;
        this.attributes = null;
        this.accessToken = null;
        this.email = null;
        this.name = null;
        this.nickName = null;
        this.profileImageUrl = null;
    }
}
