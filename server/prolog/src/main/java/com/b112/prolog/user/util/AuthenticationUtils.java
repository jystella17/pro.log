package com.b112.prolog.user.util;

import com.b112.prolog.user.exception.NotAuthenticatedException;
import com.b112.prolog.user.info.OAuth2UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;


public class AuthenticationUtils {
    public static String getCurrentUserId() {
        return Optional.ofNullable(
                        Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                                .filter(OAuth2UserPrincipal.class::isInstance)
                                .map(OAuth2UserPrincipal.class::cast)
                                .orElseThrow(NotAuthenticatedException::new)
                                .getUserInfo().getId())
                .orElseThrow(NotAuthenticatedException::new);

    }

}
