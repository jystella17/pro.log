package com.b112.prolog.user.info;

import lombok.Getter;
import java.util.Map;

@Getter
public class NaverOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider provider = OAuth2Provider.NAVER;
    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String name;
    private final String nickName;
    private final String profileImageUrl;

    public NaverOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;
        this.attributes = (Map<String, Object>) attributes.get("response");
        this.id = (String) this.attributes.get("id");
        this.email = (String) this.attributes.get("email");

        Object name = this.attributes.get("name");
        this.name = (name == null) ? "" : name.toString();
        this.nickName = (String) this.attributes.get("nickname");
        this.profileImageUrl = (String) attributes.get("profile_image");
    }
}
