package com.b112.prolog.user.jwt;

import com.b112.prolog.user.entity.UserPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class LoginAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private final UserPrincipal userPrincipal;

    public LoginAuthenticationToken(UserPrincipal userPrincipal) {
        super(userPrincipal.getEmail(), userPrincipal.getPassword(), userPrincipal.getAuthorities());

        if (userPrincipal.getAuthorities() != null) {
            this.userPrincipal = userPrincipal;
            this.setAuthenticated(true);
        } else {
            throw new IllegalArgumentException("Cannot pass null or empty values for authority");
        }
    }

    public UserPrincipal getUserPrincipal() {
        return this.userPrincipal;
    }
}
