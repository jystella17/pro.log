package com.b112.prolog.user.info;


import java.util.Map;

public interface OAuth2UserInfo {

    OAuth2Provider getProvider();

    Map<String, Object> getAttributes();

    String getAccessToken();


    String getId();

    String getEmail();

    String getName();

    String getNickName();

    String getProfileImageUrl();
}
