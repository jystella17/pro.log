package com.b112.prolog.user.info;

import lombok.Getter;
import java.util.Map;

@Getter
public class KakaoOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider provider = OAuth2Provider.KAKAO;
    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String name;
    private final String nickName;
    private final String profileImageUrl;

    public KakaoOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        this.attributes = kakaoProfile;

        this.id = ((Long) attributes.get("id")).toString();
        this.email = (String) kakaoAccount.get("email");

        Object name = kakaoAccount.get("name");
        this.name = (name == null) ? "" : name.toString();

        this.nickName = (String) kakaoProfile.get("nickname");
        this.profileImageUrl = (String) attributes.get("profile_image_url");

        this.attributes.put("id", id);
        this.attributes.put("email", this.email);
    }
}
