package com.b112.prolog.user.util;

import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.exception.NotAuthenticatedException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuthenticationUtils {

    public static String getCurrentUser() {
        final UserPrincipal userPrincipal =
                (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return Optional.ofNullable(userPrincipal.getUsername()).orElseThrow(NotAuthenticatedException::new);
    }
}
